import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLinkInformation, createUserWithOneTimeLink } from "../API/Auth";
import titleCase from "../helpers/titleCase";
import "./pages.css"


function BasicInput(props) {
    const [key, value] = props.item;

    return (
        <>
            <Form.Group className="mb-3" controlId={key}>
                <Form.Label>{titleCase(key.replace("_", " "))}</Form.Label>
                <Form.Control value={value} disabled />
            </Form.Group>
        </>
    )
}

function PasswordInput() {
    return (
        <>
            <Form.Group className="mb-3" controlId="currentPassword">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                    required
                    type="password"
                    placeholder="Current Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                    required
                    type="password"
                    placeholder="New Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="reEnterPassword">
                <Form.Label>Re-enter New Password</Form.Label>
                <Form.Control
                    required
                    type="password"
                    placeholder="New Password" />
            </Form.Group>
        </>
    )

}

function LinkInformationForm(props) {
    const [validated, setValidated] = useState(false);
    const [formBody, setFormBody] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const createValidateUser = async () => {
            let response = await createUserWithOneTimeLink(
                props.linkToken,
                formBody.currentPassword,
                formBody.newPassword)

            if (response) {
                const { user, token } = response;
                props.handleTokenLogin(token)
                navigate("/")
            }
        }
        if (formBody) {
            createValidateUser()
        }

    }, [validated])

    function handleSubmit(event) {
        event.stopPropagation();
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === true) {
            let formData = {}
            for (let section of form) {
                formData[section.id] = section.value
            }
            if (formData.newPassword === formData.reEnterPassword) {
                setFormBody(formData)
                setValidated(true)
            } else {
                alert("Passwords don't match!!!")
            }
        } else {
            setValidated(false);
        }
    }

    return (
        <Container id="link-information-form">
            <Form validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        {Object.entries(props.data).map((item, index) => <BasicInput key={index} item={item} />)}
                    </Col>
                    <Col>
                        <PasswordInput />
                    </Col>
                </Row>
                <Button variant="primary" size="lg" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

function TokenAccountSignUp(props) {
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchLinkInformation = async () => {
            const response = await getLinkInformation(props.tokenParam);
            setData(response)
        }
        fetchLinkInformation()
    }, [])

    if (data) {
        return <LinkInformationForm data={data} linkToken={props.tokenParam} handleTokenLogin={props.handleTokenLogin} />
    }
    return null
}


export default TokenAccountSignUp;
