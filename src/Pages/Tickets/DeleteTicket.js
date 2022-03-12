import TicketsAPI from '../../API/Ticket'
import { useNavigate, useParams } from "react-router-dom"
import { Card, Button, Row, Container, Nav } from 'react-bootstrap'
import { BasicNavigationBar } from "../../Components/Navigation";

const DeleteTicketPage = (props) => {
  const params = useParams()
  const navigate = useNavigate()

  // handler
  const deleteTicket = async () => {
    const data = await TicketsAPI.deleteTicket(params.ticketID)
    if (data) {
      navigate(`/`)
    }
  }
  return (
    <>
      <BasicNavigationBar isLoggedIn={props.isLoggedIn} handleLogout={props.handleLogout} />

      <Container>
        <div className=''>
          <h3 style={{ textAlign: "center" }}>Are you sure you want to delete this Ticket?</h3>
          <hr />
          <div className='d-flex justify-content-center '>
            <Button className="m-1" variant="danger" onClick={deleteTicket}>Yes</Button>
            <Button className="m-1" onClick={() => { navigate(`/tickets/${params.ticketID}`) }}>No</Button>
          </div>
        </div>
      </Container>
    </>
  )
}

export default DeleteTicketPage
