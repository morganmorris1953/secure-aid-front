import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import { sendCallBack, fetchRedirect } from "../API/Auth";
import { Button, Spinner, Container } from 'react-bootstrap'

import "./components.css"


export function VeteranLogin(props) {
    const [redirectURL, setRedirectURL] = useState(null);

    useEffect(() => {
        const getRedirect = async () => {
            const redirect = await fetchRedirect();
            if (redirect) {
                setRedirectURL(redirect.url)
            }
        }
        getRedirect()
    }, [])

    if (redirectURL) {
        return (
            <Button className="m-3" href={redirectURL} size='lg'>
                Veterans Log-in
            </Button>
        )
    }
    return null
}
