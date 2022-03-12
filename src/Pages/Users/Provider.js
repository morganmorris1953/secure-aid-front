import { useEffect, useState, useContext } from "react";
import { Container, Card, Col, Row, Nav } from "react-bootstrap";

import TicketList from "../../Components/TicketsList";
import TicketAPI from "../../API/Ticket";
import UserContext from "../../Contexts/UserContext";
import NavigationBar from "../../Components/Navigation";
import { useNavigate } from "react-router-dom";



function ProviderDashboard(props) {
  const [tickets, setTickets] = useState(null)
  const [mytickets, setMyTickets] = useState(null)

  //USECONTEXT
  const user = useContext(UserContext);
  const navigate = useNavigate()

  const retrieveTickets = async () => {
    let temptickets = await TicketAPI.getTickets()
    setTickets(temptickets)
    let tempMyTickets = await TicketAPI.getMyTickets(user.id, user.group.id)
    console.log(user.group.id)
    setMyTickets(tempMyTickets)
  }

  useEffect(() => {
    if (user) {
      retrieveTickets()
    }
  }, [user])

  if (!user || !user.isProvider()) {
    return null
  }

  return (
    <>
      <NavigationBar isLoggedIn={props.isLoggedIn} handleLogout={props.handleLogout} />
      <Container>
        <Row>
          <Col>
            <Card style={{ width: "100%", height: "70vh", overflowY: "scroll", position: "relative" }}>
              <Card.Body>
                <Card.Title>Active Tickets</Card.Title>
                <TicketList tickets={mytickets} />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "100%", height: "70vh", overflowY: "scroll", position: "relative" }}>
              <Card.Body>
                <Card.Title>Available Tickets</Card.Title>
                <TicketList tickets={tickets} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProviderDashboard;
