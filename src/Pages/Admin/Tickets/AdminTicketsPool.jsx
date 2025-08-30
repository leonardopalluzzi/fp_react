import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useState, useEffect } from "react"
import LoaderUi from "../../../Components/dumb/Loader.ui"
import ShowServiceTicketListUi from "../../../Components/dumb/ShowServiceTicketList.ui"

export default function AdminTicketsPool() {
    const { throwMessage } = useMessageContext()
    const { currentUser } = useAuthContext()
    const token = currentUser.token

    const [tickets, setTickets] = useState({
        state: 'loading'
    })

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/tickets/manage`, {
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
                    setTickets({
                        state: 'success',
                        result: data.content,
                        pagination: data
                    })
                }
            })
            .catch(err => {
                setTickets({
                    state: 'error',
                    message: err.message
                })
                throwMessage('error', [err.message])
            })
    }, [])

    function handleTicketEdit(tId) {

    }

    function handleTicketShow(tId) {

    }

    function handleTicketDelete(tId) {

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
                        <h1>Tickets Pool</h1>
                        <p>Here you can see all the open tickets that are note assigned to an operator</p>
                        <ShowServiceTicketListUi
                            tickets={tickets.result.content}
                            handleTicketEdit={handleTicketEdit}
                            handleTicketShow={handleTicketShow}
                            handleTicketsDelete={handleTicketDelete}
                        />
                    </div>

                </>
            )
    }
}