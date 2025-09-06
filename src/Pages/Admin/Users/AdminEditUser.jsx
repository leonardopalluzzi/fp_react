import LoaderUi from "../../../Components/dumb/Loader.ui"
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useMessageContext } from "../../../Contexts/MessageContext"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function AdminEditUser() {
    const { throwMessage, setLoader } = useMessageContext()
    const { currentUser } = useAuthContext()
    const token = currentUser.token
    const { id } = useParams()
    const navigate = useNavigate()

    const [user, setUser] = useState({
        state: 'loading',
        username: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/users/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.state && data.state == 'success') {
                    setUser({
                        state: 'success',
                        username: data.result.username,
                        email: data.result.email,
                        password: ''
                    })
                } else if (data.state) {
                    throwMessage(data.state, [data.message])
                } else {
                    throwMessage('error', ['Unknown Error'])
                }
            })
            .catch(err => {
                setUser({
                    state: 'error',
                    message: err.message
                })
                throwMessage('error', [err.message])
            })
    }, [])

    function handleChange(key, value) {
        setUser({
            ...user,
            [key]: value
        })
    }

    function handleSubmit() {
        setLoader(true)
        const userToSend = {
            username: user.username,
            email: user.email,
            password: user.password
        }
        console.log(userToSend);


        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/users/update/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(userToSend)
        })
            .then(res => res.json())
            .then(data => {
                console.log("DATA COMPLETO:", data);
                console.log("data.state:", data.state);
                console.log("typeof data.state:", typeof data.state);


                if (data.state && (data.state === 'error' || data.state === 'expired')) {
                    throwMessage(data.state, [data.message])
                } else {
                    throwMessage('success', ['User Updated Correctly'])
                    setLoader(false)
                    return navigate(`/admin/user/${id}`)
                }
            })
            .catch(err => {
                throwMessage('error', [err.message])
            })

    }


    switch (user.state) {
        case 'loading':
            return <LoaderUi />
        case 'error':
            return (
                <>
                </>
            )
        case 'success':
            return (
                <>
                    <div className="container my-5">
                        <h1>User Info</h1>
                        <p>Here you can update basics user info, (if you want to keep teh previous password, just leave the field blank)</p>
                        <div className="card border-0 shadow p-4">
                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">Username</span>
                                    <input value={user.username} name="username" onChange={(e) => handleChange(e.target.name, e.target.value)} type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>


                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">Email</span>
                                    <input value={user.email} name="email" onChange={(e) => handleChange(e.target.name, e.target.value)} type="email" class="form-control" placeholder="email" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>

                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">Password</span>
                                    <input value={user.password} name="password" onChange={(e) => handleChange(e.target.name, e.target.value)} type="password" class="form-control" placeholder="password" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>

                                <div className="d-flex align-items-center justify-content-center">
                                    <button className="btn btn-success w-100">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </>
            )
    }
}