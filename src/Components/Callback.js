import { useEffect } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import { sendCallBack } from "../API/Auth";
import { Spinner } from 'react-bootstrap'

import "./components.css"

function Callback(props) {
    const [search, setSearch] = useSearchParams();
    const navigate = useNavigate();

    const code = search.get("code")
    const state = search.get("state")

    useEffect(() => {
        const getUser = async () => {
            const response = await sendCallBack(code, state)
            if (response) {
                props.handleTokenLogin(response.token)
                navigate("/veteran")
            } else {
                navigate("/login")
            }
        }
        getUser()
    }, [])

    return (
        <div id="callback-spinner">
            <h1>Processing</h1>
            <Spinner animation="border" />
        </div>
    )
}

export default Callback;