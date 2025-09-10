import RegisterFormUi from "../../Components/dumb/RegisterForm.ui"
import { useState, useEffect } from "react"
import { useAuthContext } from "../../Contexts/AuthContext"
import { useNavigate } from "react-router-dom";
import { Role } from "../../Js/Roles";

export default function Register() {

    const { register } = useAuthContext();
    const navigate = useNavigate()

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
        if (user.password == '' || user.username == '' || user.email == '') {
            return throwMessage('error', ['fill all the required fields'])
        }
        register(user);
    }
    return (
        <>
            <div className="container my-5">
                <h1>Register</h1>
                <RegisterFormUi
                    user={user}
                    onchange={handleChange}
                    onsubmit={handleSubmit}
                    passwordRequired={true}
                />
            </div>

        </>
    )
}