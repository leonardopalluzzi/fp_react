import LoginFormUi from "../../Components/dumb/LoginForm.ui"
import { useState } from "react"
import { useAuthContext } from "../../Contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Login() {

    const { login } = useAuthContext()
    const navigate = useNavigate()

    const [userToSend, setUserToSend] = useState({
        username: '',
        password: ''
    })

    function handleChange(key, value) {
        setUserToSend({
            ...userToSend,
            [key]: value
        })
    }

    function handleSubmit() {
        login(userToSend)
        setUserToSend({
            username: '',
            password: ''
        })
    }

    return (
        <>
            <LoginFormUi
                user={userToSend}
                onchange={handleChange}
                onsubmit={handleSubmit}
            />
        </>
    )
}