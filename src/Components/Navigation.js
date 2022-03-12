import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Contexts/UserContext';
import Icon from "../logo.svg";
import "../Pages/backgroundStyle.css"

const LogButton = (props) => {
  const { isLoggedIn, handleLogout } = props;
  const Navigation = (props) => {
    if (isLoggedIn) {
      return <Button className="nav-buttons" onClick={handleLogout}>Logout</Button>
    }
    return <Nav.Link href='/login'><Button className="nav-buttons">Login</Button></Nav.Link>
  }
}

const NavigationBar = (props) => {
  const user = useContext(UserContext);
  const { isLoggedIn, handleLogout } = props;

  return (
    <div id='navbar'>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand id="Nav-brand" href="/">Welcome {user ? `Back ${user.firstName}` : "to Secure Aid"}</Navbar.Brand>
          <Nav className="d-flex flex-row align-items-center justify-content-between">
            {props.children}
            {
              !props.isLoggedIn
                ? <>
                  <Nav.Link href='/login'><Button className="nav-buttons">Login</Button></Nav.Link>
                </>
                :
                <>
                  <Button className="nav-buttons" onClick={props.handleLogout}>Logout</Button>
                </>
            }
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

function DashboardButton() {
  const navigate = useNavigate()
  const user = useContext(UserContext);

  const handleClick = () => {
    if (!user) {
      return
    }

    if (user.isVeteran()) {
      navigate("/veteran")
    }
    if (user.isProvider()) {
      navigate("/provider")
    }
    if (user.isRecipient()) {
      navigate("/recipient")
    }
  }
  return <Button onClick={handleClick}>Dashboard</Button>
}

export function BasicNavigationBar(props) {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <NavigationBar isLoggedIn={props.isLoggedIn} handleLogout={props.handleLogout}>
      <DashboardButton />
    </NavigationBar>
  )
}

export default NavigationBar;
