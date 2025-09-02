import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import LoaderUi from "../../../Components/dumb/Loader.ui"
import ShowServiceTicketListUi from "../../../Components/dumb/ShowServiceTicketList.ui"
import { useNavigate } from "react-router-dom"
import ServiceTabelLightUi from "../../../Components/dumb/ServiceTableLight.ui"


export default function AdminShowUser() {
    const { throwMessage } = useMessageContext()
    const { currentUser } = useAuthContext()
    const { id } = useParams()
    const token = currentUser.token
    const navigate = useNavigate()


    const [user, setUser] = useState({
        state: 'loading'
    })


    useEffect(() => {
        handleFetch()
    }, [])

    function handleFetch() {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/users/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.state && (data.state == 'error' || data.state == 'expired')) {
                    throwMessage(data.state, [data.message])
                } else {
                    setUser({
                        state: 'success',
                        result: data
                    })
                }

            }
            )
            .catch(err => {
                setUser({
                    state: 'error',
                    message: err.message
                })
                throwMessage('error', [err.message])
            })
    }

    function handleTicketEdit(tId) {
        return navigate(`/admin/ticket/edit/${tId}`)
    }

    function handleTicketDelete(tId) {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/tickets/delete/${tId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

            })
            .catch(err => {
                console.error(err)
            })

    }

    function handleTicketShow(tId) {
        return navigate(`/admin/ticket/${tId}`)

    }

    function handleServiceShow(sId) {
        return navigate(`/admin/service/${sId}`)
    }


    switch (user.state) {
        case 'loading':
            return (
                <>
                    <LoaderUi />
                </>
            )
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
                        <p>Here you can see all the info releated to a single user</p>
                        <div className="card border-0 shadow p-4">

                            <label htmlFor="">Username:</label>
                            <h3>{user.result.username}</h3>

                            <label htmlFor="">Email:</label>
                            <h3>{user.result.email}</h3>

                            <label htmlFor="">Created At:</label>
                            <h3>{user.result.createdAt}</h3>

                            <label htmlFor="">Roles:</label>
                            <ul className="list-unstyled">
                                {user.result.roles.map(item => (
                                    <>
                                        <li>{item.name}</li>
                                    </>
                                ))}
                            </ul>

                        </div>
                        <div className="my-5">
                            <h2>Services</h2>
                            <ServiceTabelLightUi
                                services={user.result.services}
                                onShow={handleServiceShow}
                            />
                        </div>

                        <div className="row row-cols-1 row-cols-md-2">
                            <div className="col my-5">
                                <h2 className="mb-0">Assigned Tickets:</h2>
                                <ShowServiceTicketListUi
                                    tickets={user.result.adminTickets}
                                    handleTicketEdit={handleTicketEdit}
                                    handleTicketShow={handleTicketShow}
                                    handleTicketsDelete={handleTicketDelete}
                                />
                            </div>

                            <div className="col my-5">
                                <h2 className="mb-0">Requested Tickets:</h2>
                                <ShowServiceTicketListUi
                                    tickets={user.result.userTickets}
                                    handleTicketEdit={handleTicketEdit}
                                    handleTicketShow={handleTicketShow}
                                    handleTicketsDelete={handleTicketDelete}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )
    }
}