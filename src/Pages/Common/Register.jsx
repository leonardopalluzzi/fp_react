import RegisterFormUi from "../../Components/dumb/RegisterForm.ui"
import { useState } from "react"
import { useAuthContext } from "../../Contexts/AuthContext"

export default function Register() {

    const { register } = useAuthContext();

    const [user, setuser] = useState({
        username: '',
        email: '',
        password: ''
    })

    function handleChange(key, value) {
        setuser({
            ...user,
            [key]: value
        })
    }

    function handleSubmit() {
        register(user);
    }
    return (
        <>
            <RegisterFormUi
                user={user}
                onchange={handleChange}
                onsubmit={handleSubmit}
            />
        </>
    )
}