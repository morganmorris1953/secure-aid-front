import { useEffect, useState, useContext } from "react";
import { Container, Card, Col, Row, Nav } from "react-bootstrap";
import TicketList from "../../Components/TicketsList";
import TicketAPI from "../../API/Ticket";
import UserContext from "../../Contexts/UserContext";
import NavigationBar from "../../Components/Navigation";
import { useNavigate } from "react-router-dom";


function RecipientDashboard(props) {
  const [mytickets, setMyTickets] = useState(null)

  //USECONTEXT
  const user = useContext(UserContext);
  const navigate = useNavigate()

  const retrieveTickets = async () => {
    let temptickets = await TicketAPI.getTickets()
    let tempMyTickets = await TicketAPI.getMyTickets(user.id, user.group.id)
    console.log(tempMyTickets)
    setMyTickets(tempMyTickets)
  }

  useEffect(() => {
    if (user) {
      retrieveTickets()
    }
  }, [user])


  if (!user || !user.isRecipient()) {
    return null
  }

  return (
    <>
      <NavigationBar isLoggedIn={props.isLoggedIn} handleLogout={props.handleLogout} />
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Your Aid Requests</Card.Title>
                <TicketList tickets={mytickets} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RecipientDashboard;
