import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Table, Button, Card, Row, Container, Nav, Col } from 'react-bootstrap'
import ChatPage from '../../Components/Chat';
import { BasicNavigationBar } from "../../Components/Navigation";
import TicketAPI from '../../API/Ticket';
import UserContext from '../../Contexts/UserContext';
import "../pages.css"


function TicketPage(props) {

  // states
  const [ticket, setTicket] = useState(null)
  const [recipName, setRecipName] = useState(null)

  const user = useContext(UserContext)
  // router props
  const params = useParams()

  // effects
  useEffect(() => {
    const getTicket = async () => {
      const data = await TicketAPI.fetchTicketByID(params.ticketID)
      if (data) {
        setTicket(data)
      }
    }
    const getRecipName = async () => {
      const data = await TicketAPI.fetchUserName(ticket.aid_recipient_id, user.token)
      if (data) {
        setRecipName(`${data.first_name} ${data.last_name}`)
      }
    }
    getTicket()
    if (ticket){
      getRecipName()
    }
    console.log(ticket,user && user.isProvider())
  }, [params.ticketID,ticket])

  const claimTicket = async () => {
    const data = await TicketAPI.assignProvider(params.ticketID, user.id, user.token)
    if (data) {
      setTicket(data)
    }
  }

  const completeTicket = async () => {
    const data = await TicketAPI.completeTicket(params.ticketID, user.token)
    if (data) {
      setTicket(data)
    }
  }

  const renderTicket = () => {
    if (!ticket)
      return (
        <div>404: No Ticket with this number</div>
      )

    return (
      <div>
        <BasicNavigationBar isLoggedIn={props.isLoggedIn} handleLogout={props.handleLogout} />
        <Container>
          <Row>
            <Col>
              <Card style={{ width: "100%", height: "70vh", overflowY: "scroll" }} className="p-4">
          <h2>{ticket.title}</h2>
          <Table id="Ticket">
            <thead>
              <tr>
                <th> </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Category: </td><td>{ticket.category}</td></tr>
              <tr><td>Date Needed:</td><td> {ticket.need_by_date}</td></tr>
              <tr><td>Status:</td><td>{ticket.status}</td></tr>
              <tr><td>Details:</td><td> {ticket.sponsor_comments}</td></tr>
              <tr><td>Provider Comments:</td><td> {ticket.provider_comments}</td></tr>
              <tr><td>AID Recipient:</td><td> {recipName}</td></tr>
            </tbody>
          </Table>
          <div>
          { ticket && <Link to={`/tickets/${ticket.id}/update`} state={{ticket}}><Button>Modify Ticket</Button></Link>  } |<> </>
          { ticket && <Link to={`/tickets/${ticket.id}/delete`}><Button style={{backgroundColor:"red"}}>Delete Ticket</Button></Link>  } |<> </>
          { ticket && user && user.isProvider() && ticket.status=="Awaiting" && <Button onClick={claimTicket} style={{backgroundColor:"green"}}>Claim this Ticket</Button> }|<> </>
          { ticket && user && user.isProvider() && ticket.status=="In-Progress" &&  <Button onClick={completeTicket} style={{backgroundColor:"green"}}>Mark Ticket Complete</Button>}
          </div>
        </Card>        
      </Col>      
      <Col>
        <Card style={{ width: "100%", height: "70vh", overflowY: "scroll", position: "relative" }}>
          <ChatPage ticketID={params.ticketID}/>
        </Card>
      </Col>
    </Row>
        
                {/* <h2>{ticket.title}</h2>
                <Table id="Ticket">
                  <thead>
                    <tr>
                      <th> </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Category: </td><td>{ticket.category}</td></tr>
                    <tr><td>Date Needed:</td><td> {ticket.need_by_date}</td></tr>
                    <tr><td>Status:</td><td>{ticket.status}</td></tr>
                    <tr><td>Details:</td><td> {ticket.sponsor_comments}</td></tr>
                    <tr><td>Provider Comments:</td><td> {ticket.provider_comments}</td></tr>
                    <tr><td>AID Recipient:</td><td> {ticket.aid_recipient_id}</td></tr>
                  </tbody>
                </Table>
                <div>
                  {ticket && <Link to={`/tickets/${ticket.id}/update`} state={{ ticket }}><Button>Modify Ticket</Button></Link>} |<> </>
                  {ticket && <Link to={`/tickets/${ticket.id}/delete`}><Button style={{ backgroundColor: "red" }}>Delete Ticket</Button></Link>} |<> </>
                  {ticket && user && user.isProvider() && ticket.status == "Awaiting" && <Button onClick={claimTicket} style={{ backgroundColor: "green" }}>Claim this Ticket</Button>}|<> </>
                  {ticket && user && user.isProvider() && ticket.status == "In-Progress" && <Button onClick={completeTicket} style={{ backgroundColor: "green" }}>Mark Ticket Complete</Button>}
                </div>
              </Card>

              
                <ChatPage ticketID={params.ticketID} />
              </Card> */}
        </Container>
      </div>
    )
  }


  return (
    <div>
      {renderTicket()}
    </div>
  )
}

export default TicketPage


// className='d-flex justify-content-between'
// style={{width:"49%", maxHeight:"60vh", overflowY: "scroll"}}