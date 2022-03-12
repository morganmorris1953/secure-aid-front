import { Form, Button, Container, Card } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VeteranLogin } from "../Components/VeteranLogin";
/* import '../App.css' */
import "../Pages/backgroundStyle.css"
function LoginPage(props) {
  const [validated, setValidated] = useState(false);
  const [fields, setFields] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  function checkFields() {
    return fields.username.length > 0 && fields.password.length > 0;
  }

  const handleChange = (event) => {
    let tempFields = { ...fields };
    tempFields[event.target.name] = event.target.value;
    setFields(tempFields);
  };

  function handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === true) {
      if (checkFields()) {
        setValidated(true)
        props.handleStandardLogin(fields)
        navigate("/")
      }
    }
    setValidated(false)
  }


  const renderForm = () => {
    return (
      <div className='top-login'>
        <div className="d-flex login-left ">
          <h4 className="m-3">Aid Providers and Aid Recipients <br/> Log in here.</h4>
            <Form validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="p-2" controlId="username">
                <Form.Control
                  onChange={handleChange}
                  required
                  name="username"
                  type="text"
                  placeholder="Enter Username"
                ></Form.Control>
              </Form.Group>

              <Form.Group className="p-2" controlId="password">
                <Form.Control
                  onChange={handleChange}
                  required
                  name="password"
                  type="password"
                  placeholder="Enter Password" />
              </Form.Group>
              <Button className="m-3" variant="primary" type="submit">Submit</Button>
            </Form>
      </div>
        <div className="d-flex align-items-center login-right">
        <h4 className="m-1">Veterans log in using VA.gov.</h4>

            <VeteranLogin />
          </div>
      </div>
    )
  };


  return (

    <div style={{width:"100%"}}>
      {renderForm()}
    </div>
  )
}

export default LoginPage;
