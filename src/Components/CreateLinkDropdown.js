import { Form, Button, Modal, Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getShareLink } from "../API/Auth";

function BasicInput(props) {
    return (
        <Form.Group className="m-3" controlId={props.controlId}>
            <Form.Label>{props.title}</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder={props.title}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group >
    )
}

function EmailInput() {
    return (<>
        <Form.Group className="m-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                required
                type="email"
                placeholder="Enter email"
            />
            <Form.Text className="text-muted">
                We'll never share the email address with anyone else.
            </Form.Text>
        </Form.Group>
    </>)
}

function PasswordInput() {
    return (<>
        <Form.Group className="m-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
                required
                type="password"
                placeholder="Password" />
        </Form.Group>
    </>)
}

function CopyClipboardButton(props) {
    const [click, toggleClick] = useState(false)
    const { link } = props;

    useEffect(() => {
        const copy = async () => {
            try {
                const promise = await navigator.clipboard.writeText(props.link)
                alert("Copied link to clipboard.")
            } catch (error) {
                console.error(error)
            }
        }

        if (link && click) {
            copy()
            toggleClick(false)
        }
    }, [click])

    return (
        <Button variant="primary" onClick={() => { toggleClick(true) }}>
            Copy Link to Clipboard
        </Button>
    )
}

function LinkModal(props) {
    const [show, setShow] = useState(true);
    const { setShareLink, shareLink } = props;

    const handleClose = () => {
        setShareLink(null)
        setShow(false)
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Copy and send this referral link.</Modal.Title>
                </Modal.Header>

                <Modal.Body className="text-break">
                    {shareLink}
                </Modal.Body>

                <Modal.Footer>
                    <CopyClipboardButton link={shareLink} />
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function CreateLinkDropdown() {
    const [validated, setValidated] = useState(false);
    const [shareLink, setShareLink] = useState(null);
    const [formBody, setFormBody] = useState(null);

    useEffect(() => {
        const fetchShareLink = async () => {
            let token = JSON.parse(localStorage.getItem("token"))
            let response = await getShareLink(token.access, formBody)

            if ('message' in response) {
                alert(response.message)
            }
            if ('url' in response) {
                setShareLink(response.url)
            }
        }
        if (validated) {
            fetchShareLink()
        }
    }, [validated, formBody])

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(false)
        }

        let formData = {}

        for (let form of event.target) {
            formData[form.id] = form.value
        }
        event.preventDefault();
        setFormBody(formData)
        setValidated(true)
    }
    if (shareLink) {

        return <LinkModal shareLink={shareLink} setShareLink={setShareLink} />
    }

    return (
        <Dropdown autoClose={false}>
            <Dropdown.Toggle variant={"secondary"}>Create Link For Recipient Account</Dropdown.Toggle>
            <Dropdown.Menu>
                <Form validated={validated} onSubmit={handleSubmit}>
                    <BasicInput title={"First Name"} controlId={"firstName"} />
                    <BasicInput title={"Last Name"} controlId={"lastName"} />
                    <BasicInput title={"Username"} controlId={"userName"} />
                    <EmailInput />
                    <PasswordInput />
                    <Button variant="primary" type="submit" className="m-3">
                        Submit
                    </Button>
                </Form>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CreateLinkDropdown;