import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LoaderUi from "../../../Components/dumb/Loader.ui"
import { useNavigate } from "react-router-dom"
import ShowTicketFullUi from "../../../Components/dumb/ShowTicketFull.ui"
import TicketHistoryTasbleUi from "../../../Components/dumb/TicketHistoryTable.ui"
import TicketManager from "../../../Components/smart/TicketManager"

export default function AdminShowTicket() {
    const { throwMessage } = useMessageContext()
    const { currentUser } = useAuthContext()
    const { id } = useParams()
    const token = currentUser.token
    const navigate = useNavigate()

    const [ticket, setTicket] = useState({
        state: 'error',
    })

    const [page, setPage] = useState(0)


    const urlTicketFetch = `${import.meta.env.VITE_BACK_URL}/api/v1/tickets/${id}`
    const urlTicketHistoryFetch = `${import.meta.env.VITE_BACK_URL}/api/v1/tickets/manage/history/${id}?page=${page}`

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    useEffect(() => {
        console.log("ID ticket:", id, "Page:", page);

        const ticketFetch = async () => {
            try {
                const [tt, th] = await Promise.all([
                    fetch(urlTicketFetch, options),
                    fetch(urlTicketHistoryFetch, options)
                ])

                //json

                const [ticket, ticketHistory] = await Promise.all([
                    tt.json(),
                    th.json()
                ])

                //setto
                console.log(ticket);

                setTicket({
                    state: 'success',
                    result: ticket,
                    history: {
                        get: ticketHistory.content,
                        pagination: ticketHistory.pageable
                    }
                })

            } catch (err) {
                setTicket({
                    state: 'error',
                    message: err.message
                })
            }
        }

        ticketFetch()
    }, [])


    switch (ticket.state) {
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
                        <ShowTicketFullUi
                            ticket={ticket.result}
                        />
                        <TicketManager
                            currentUser={currentUser}
                            serviceId={ticket.result.service.id}
                            ticketId={id}
                        />
                        <TicketHistoryTasbleUi
                            history={ticket.history}
                        />
                    </div>
                </>
            )
    }
}