import { Form, Button, Card } from "react-bootstrap";
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TicketAPI from "../../API/Ticket"
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import UserContext from "../../Contexts/UserContext";


function ModifyTicketPage(props) {
  const navigate = useNavigate()
  const location = useLocation()

  const user = useContext(UserContext)

  let initialTicket = location.state && location.state.ticket
  let action = initialTicket ? "Update" : "Add"

  const [category, setCategory] = useState(initialTicket && initialTicket.category)
  const [date, setDate] = useState(initialTicket && initialTicket.need_by_date)
  const [status, setStatus] = useState(initialTicket && initialTicket.status)
  const [aidRecipID, setAidRecipID] = useState(initialTicket && initialTicket.aid_recipient_id)
  const [aidRecipOptions, setAidRecipOptions] = useState(undefined)

  const pullAidRecips = async (sponsorID, token) => {
    let tempAidReceps = await TicketAPI.fetchAidRecipIDs(sponsorID, token)
    console.log(tempAidReceps, user)
    setAidRecipOptions(tempAidReceps)
  }

  useEffect(()=>{
    console.log("In Effect",user,initialTicket, aidRecipID)
    if(user && initialTicket){
      pullAidRecips(initialTicket.sponsor_id, user.token)
    }
    else if(user && user.isVeteran()){
      pullAidRecips(user.id, user.token)
    }
  },[user, initialTicket])

  let categories = [
    "Medical",
    "Legal",
    "Financial"
  ]
  let statuses = [
    "Awaiting",
    "In-Progress",
    "Complete",
  ]


  // handlers
  const handleSubmit = async (event) => {
    event.preventDefault()

    const ticketData = {
      title: event.target.elements[0].value,
      category: event.target.elements[1].value,
      need_by_date: event.target.elements[2].value,
      sponsor_comments: event.target.elements[3].value,
    }
    if (user.isProvider()){
      ticketData.provider_comments = event.target.elements[4].value
    }
    else {ticketData.provider_comments = ""}

    if (action=="Add"){
      ticketData.aid_recipient_id= event.target.elements[5].value
    }
    else {ticketData.aid_recipient_id= initialTicket.aid_recipient_id}
    
    
    if (initialTicket == undefined) {
      ticketData.status = "Awaiting"
      ticketData.sponsor_id = user.id;
    }

    const data = (
      initialTicket
        ? await TicketAPI.updateTicket(ticketData, initialTicket.id)
        : await TicketAPI.addTicket(ticketData)
    )
    if (data) {
      navigate(`/tickets/${data.id}`)
    }
  }
  const renderForm = () => {


    return (
      <div style={{ maxWidth: "700px" }}>
        <h2>{user && user.first_name} {action} Your Ticket Info Below</h2>
        <Card className="p-2">
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" type="text" defaultValue={initialTicket && initialTicket.title} placeholder="Enter title"></Form.Control>
          </Form.Group><hr/>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              as="select"
              value={category}
              onChange={e => {
                console.log("e.target.value", e.target.value);
                setCategory(e.target.value);
              }}
            >
              {categories.map((cat, index) => {
                return (<option key={index} value={cat}>{cat}</option>)
              })}
            </Form.Select>
          </Form.Group><hr/>
          <Form.Group>
            <Form.Label>Need By Date</Form.Label>
            <Form.Control
              name="need_by_date"
              type="date"
              placeholder="MM/DD/YYYY"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group><hr/>
            <Form.Group>
              <Form.Label>Details</Form.Label>
              <Form.Control name="sponsor_comments" as="textarea" rows={4} defaultValue={initialTicket && initialTicket.sponsor_comments} placeholder="Enter sponsor_comments"></Form.Control>
            </Form.Group><hr/>
            <Form.Group>
              <Form.Label>Aid Provider Comments</Form.Label>
              <Form.Control name="provider_comments" as="textarea" rows={2} defaultValue={initialTicket && initialTicket.provider_comments} placeholder="Enter Comments (Aid Providers Only)"></Form.Control>
            </Form.Group><hr/>
          {aidRecipOptions && initialTicket!=undefined &&
            <Form.Group >
              <Form.Label style={{width:"100%"}}>Aid Recipient: {aidRecipOptions.map((recip, index) => {
                if(recip.id==aidRecipID){return <div style={{backgroundColor:"white",borderRadius:"5px",padding:"3px",color:"black",width:"100%"}} key={index}>{recip.first_name} {recip.last_name}</div>};
                console.log(recip)
              })}</Form.Label>
            </Form.Group>
          }
          {aidRecipOptions && initialTicket==undefined &&
            <Form.Group>
              <Form.Label>Aid Recipient</Form.Label>
              <Form.Select aria-label="Default select example"
                name="aid_recipient_id"
                as="select"
                value={aidRecipID}
                onChange={e => {
                  console.log("e.target.value", e.target.value);
                  setAidRecipID(e.target.value);
                }}
              >
                {aidRecipOptions.map((recip, index) => {
                  return (<option key={index} value={recip.id}>{recip.first_name} {recip.last_name}</option>)
                })}
              </Form.Select>
            </Form.Group>}<hr/>
          <br />
          <Button type="submit">Save</Button>
        </Form>
        </Card>
      </div>
      
    )
  };
  return (
    <div id="Add-Ticket-Page">
      {renderForm()}
    </div>
  )
}

export default ModifyTicketPage
