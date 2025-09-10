import { useAuthContext } from "../../Contexts/AuthContext"
import { useState, useEffect } from "react"
import { useMessageContext } from "../../Contexts/MessageContext"
import LoaderUi from "../../Components/dumb/Loader.ui"
import RegisterFormUi from "../../Components/dumb/RegisterForm.ui"
import { useNavigate } from "react-router-dom"
import Error from "../../Components/dumb/Error"
import { deleteProfile } from "../../Js/FetchFunctions"
import { useFiltersContext } from "../../Contexts/FiltersContext"
import DeleteModalUi from "../../Components/dumb/DeleteModal.ui"

export default function ShowProfile() {
    const { currentUser, prefix } = useAuthContext()
    const token = currentUser.token
    const id = currentUser.details.id
    const { throwMessage, setLoader } = useMessageContext()
    const { handleRefresh } = useFiltersContext()
    const navigate = useNavigate()

    const [user, setUser] = useState({
        state: 'loading'
    })
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        fetchData(token)
    }, [])

    function fetchData(token) {
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
                        result: data.result
                    })

                    setNewUser({
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
    }

    function handleChange(key, value) {
        setNewUser({
            ...newUser,
            [key]: value
        })
    }

    function handleSubmit() {
        const userToUpdate = { ...newUser }


        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/users/update/${user.result.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userToUpdate)
        })
            .then(res => res.json())
            .then(data => {
                if (data.state && data.state == 'success') {
                    throwMessage(data.state, ['User updated correctly, you need to re-login'])
                    return navigate("/login")
                } else if (data.state) {
                    throwMessage(data.state, [data.message])
                } else {
                    throwMessage('error', ['Unknown Error'])
                }
            })
            .catch(err => {
                setNewUser({
                    state: 'error',
                    message: err.message
                })
                throwMessage('error', [err.message])
            })
    }

    function handleDeleteUser(uId) {
        deleteProfile(uId, token, throwMessage, setLoader, navigate)
    }


    switch (user.state) {
        case 'loading':
            return <LoaderUi />
        case 'error':
            return (
                <>
                    <Error message={user.message} />
                </>
            )
        case 'success':
            return (
                <>
                    <div className="container my-5">
                        <div className="d-flex align-items-center justify-content-between">
                            <h1>Profile Info</h1>
                            {
                                prefix == 'customer' && <div className="d-flex align-items-center jusitfy-content-center gap-4">
                                    <p>Delete Your Profile</p>
                                    <DeleteModalUi itemId={currentUser.details.id} deleteFunction={handleDeleteUser} />
                                </div>
                            }
                        </div>


                        <div className="row row-cols-1 row-cols-md-2">

                            <div className="col">
                                <div className="card border-0 shadow p-3">
                                    {/* sezione show  */}
                                    <div className="my-4">
                                        <div className="my-4">
                                            <label htmlFor="">Username:</label>
                                            <h2>{user.result.username}</h2>
                                        </div>

                                        <div className="my-4">
                                            <label htmlFor="">Email:</label>
                                            <h5>{user.result.email}</h5>
                                        </div>

                                        <div className="my-4">
                                            <label htmlFor="">Created At:</label>
                                            <h5>{user.result.createdAt}</h5>
                                        </div>


                                        <div className="my-4">
                                            <label htmlFor="">Roles:</label>
                                            <ul className="list-unstyled">
                                                {
                                                    user.result.roles.map((r, i) => (
                                                        <li key={`showProfile-${i}`}>{r.name}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                {/* sezione di edit  */}
                                <RegisterFormUi
                                    user={newUser}
                                    label={'Save'}
                                    onchange={handleChange}
                                    onsubmit={handleSubmit}
                                    passwordRequired={false}
                                />
                            </div>
                        </div>

                    </div>
                </>
            )
    }
}