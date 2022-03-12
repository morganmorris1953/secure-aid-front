import { Container, Card, Col, Row, Nav, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketList from "../../Components/TicketsList";
import UserContext from "../../Contexts/UserContext";
import NavigationBar from "../../Components/Navigation";
import CreateLinkDropdown from "../../Components/CreateLinkDropdown";
import TicketAPI from "../../API/Ticket"

function VeteranDashboard(props) {
  const user = useContext(UserContext)
  const navigate = useNavigate()

  //states
  const [hasRecip, setHasRecip] = useState(false)
  const [mytickets, setMyTickets] = useState(null)

  useEffect(() => {
    console.log("In Effect", user)
    if (user) {
      retrieveTickets()
      hasSignedUpRecip(user.id, user.token)
    }
  }, [user])

  const hasSignedUpRecip = async (sponsorID, token) => {
    let tempAidReceps = await TicketAPI.fetchAidRecipIDs(sponsorID, token)
    if (tempAidReceps.length != 0) {
      setHasRecip(true)
    }
  }

  const retrieveTickets = async () => {
    let temptickets = await TicketAPI.getTickets()
    let tempMyTickets = await TicketAPI.getMyTickets(user.id, user.group.id)
    console.log(tempMyTickets)
    setMyTickets(tempMyTickets)
  }

  if (!user || !user.isVeteran()) {
    return null
  }

  return (<>
    <NavigationBar isLoggedIn={props.isLoggedIn} handleLogout={props.handleLogout}>
      <CreateLinkDropdown />
      {hasRecip && <Nav.Link href="/tickets/add"><Button>Add Aid Request Ticket</Button></Nav.Link>}
    </NavigationBar>
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Aid Requests</Card.Title>
              <TicketList tickets={mytickets} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </>)
}

export default VeteranDashboard;

