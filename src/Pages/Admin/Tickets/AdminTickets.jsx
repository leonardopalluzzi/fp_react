import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useState, useEffect } from "react"
import LoaderUi from "../../../Components/dumb/Loader.ui"
import ShowServiceTicketListUi from "../../../Components/dumb/ShowServiceTicketList.ui"
import { useNavigate } from "react-router-dom"

export default function AdminTickets() {
    const { throwMessage } = useMessageContext()
    const { currentUser } = useAuthContext()
    const token = currentUser.token
    const navigate = useNavigate()

    const [tickets, setTickets] = useState({
        state: 'loading'
    })

    //fetch dati

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/tickets`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setTickets({
                    state: 'success',
                    pagination: data.pageable,
                    result: data.content
                })
            })
            .catch(err => {
                setTickets({
                    state: 'error',
                    message: err.message
                })
            })
    }, [])

    function handleTicketEdit(tId) {
        return navigate(`/admin/ticket/edit/${tId}`)

    }

    function handleTicketShow(tId) {
        return navigate(`/admin/ticket/${tId}`)
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

    switch (tickets.state) {
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
                        <h1>Assigned Tickets</h1>
                        <p>Here you can see all the currently assigned tickets</p>
                        <ShowServiceTicketListUi
                            tickets={tickets.result}
                            handleTicketEdit={handleTicketEdit}
                            handleTicketShow={handleTicketShow}
                            handleTicketsDelete={handleTicketDelete}
                        />

                    </div>
                </>
            )
    }
}