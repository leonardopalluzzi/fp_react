
import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import RegisterFormUi from '../../../Components/dumb/RegisterForm.ui'
import { useNavigate } from "react-router-dom"

export default function AdminCreateUser() {
    const { throwMessage } = useMessageContext()
    const { currentUser } = useAuthContext()
    const token = currentUser.token
    const { id } = useParams()
    const navigate = useNavigate()

    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: ''
    })


    function handleSubmit() {

        const userToSend = { ...newUser }
        console.log(userToSend);


        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/users/store/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(userToSend)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.state && (data.state == 'error' || data.state == 'expired')) {
                    throwMessage(data.state, [data.message])
                } else {
                    throwMessage('success', ['Operator created succsefully'])
                    return navigate(`/admin/service/${id}`)
                }
            })
            .catch(err => {
                throwMessage('error', [err.message])
            })
    }

    function handleChange(key, value) {
        setNewUser({
            ...newUser,
            [key]: value
        })
    }

    return (
        <>
            <div className="container my-5">
                <h1>Add an operator</h1>
                <RegisterFormUi
                    user={newUser}
                    onchange={handleChange}
                    onsubmit={handleSubmit}
                />
            </div>

        </>
    )
}