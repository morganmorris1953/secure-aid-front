import React, { useState, useEffect, useContext, useRef } from "react";
import UserContext from "../Contexts/UserContext";
import { Container, Card, Form, ListGroup, ListGroupItem } from "react-bootstrap";

const URL = 'ws://localhost:8000/ws/chat';

const ChatPage = (props) => {
  //STATES
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(new WebSocket(URL));

  //USECONTEXT
  const user = useContext(UserContext);
  const messagesEndRef = useRef(null);

  const submitMessage = (message) => {
    const data = { from: user.username, text: message, command: 'new_message', room_id: props.ticketID };
    console.log(user)
    ws.send(JSON.stringify(data));
    console.log(data)
    // setMessages([message, ...messages]);
  }

  //functions
  const fetchMessages = () => {
    const data = { room_id: props.ticketID, command: 'fetch_messages' }
    ws.send(JSON.stringify(data))
  }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth"})
  }

  //USE-EFFECTS
  useEffect(() => {
    if (user) {
      ws.onopen = () => {
        console.log('WebSocket Connected')
        fetchMessages();
      }
    }
  }, [user])

  useEffect(() => {
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data)
      if (data.command === 'new_message') {
        setMessages([...messages, data.message]);
      }
      else if (data.command === 'messages') {
        setMessages(data.messages)
        scrollToBottom()
      }
      return () => {
        ws.onclose = () => {
          console.log('Websocket Disconnected');
          setWs(new WebSocket(URL))
        }
      }
    }
  }, [ws.onmessage, ws.onopen, ws.onclose, messages]);



  if (!user) {
    return null
  }

  return (
    <div>
      <Container>
        <Card >
          <ListGroup>
            {messages.reverse().map((message, index) =>
              <div key={index}  className={user.firstName == message.author ? "d-flex message-right justify-content-end my-chat" : "other-chat"}>
                <ListGroupItem style={{ width: "80%" }}>
                  <b>{message.author}</b>: <em>{message.content}</em>
                </ListGroupItem>
              <div ref={messagesEndRef}/>
              </div>
            )}
          </ListGroup>
          <Form
            action=""
            onSubmit={e => {
              e.preventDefault();
              submitMessage(message);
              setMessage([]);
            }}>
            <input
              style={{width:"90%"}}
              type="text"
              placeholder={'Type a message ...'}
              value={message}
              onChange={e => setMessage(e.target.value)} />
            <input type="submit" value={'Send'} />
          </Form>
        </Card>
      </Container>
    </div>
  )
}


export default ChatPage;