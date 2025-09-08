import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LoaderUi from "../../../Components/dumb/Loader.ui"
import { useNavigate } from "react-router-dom"
import ShowTicketFullUi from "../../../Components/dumb/ShowTicketFull.ui"
import TicketHistoryTasbleUi from "../../../Components/dumb/TicketHistoryTable.ui"
import TicketManager from "../../../Components/smart/TicketManager"
import { useFiltersContext } from "../../../Contexts/FiltersContext"
import DataWrapper from "../../../Components/smart/DataWrapper"
import Error from "../../../Components/dumb/Error"

export default function AdminShowTicket() {
    const { throwMessage, setLoader } = useMessageContext()
    const { currentUser } = useAuthContext()
    const { id } = useParams()
    const token = currentUser.token
    const navigate = useNavigate()
    const { setFiltersConfig, refreshKey } = useFiltersContext()

    const [ticket, setTicket] = useState({
        state: 'loading',
    })

    const [page, setPage] = useState(0)

    useEffect(() => {
        if (ticket.state == 'success') {
            setFiltersConfig(1, page, ticket.history.pagination.totalPages, setPage)
        }
    }, [page, ticket])


    const urlTicketFetch = `${import.meta.env.VITE_BACK_URL}/api/v1/tickets/${id}`
    const urlTicketHistoryFetch = `${import.meta.env.VITE_BACK_URL}/api/v1/tickets/manage/history/${id}?page=${page}`

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    useEffect(() => {
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

                if (ticket.state && ticketHistory.state && (ticket.state == 'success' && ticketHistory.state == 'success')) {
                    console.log(ticket);

                    setTicket({
                        state: 'success',
                        result: ticket.result,
                        history: {
                            get: ticketHistory.result.content,
                            pagination: ticketHistory.result
                        }
                    })
                } else if (ticket.state && ticketHistory.state) {
                    throwMessage(ticket.state || ticketHistory.state, [ticket.message || ticketHistory.message])
                    return
                } else {
                    throwMessage('error', ['Unknown Error'])
                    return
                }

            } catch (err) {
                throwMessage('error', [err.message])
                setTicket({
                    state: 'error',
                    message: err.message
                })
            } finally {
                setLoader(false)
            }
        }

        ticketFetch()
    }, [page, refreshKey])


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
                    <Error message={ticket.message} />
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
                            ticketStatus={ticket.result.status}
                            currentAssignee={ticket.result.assignedTo != null ? ticket.result.assignedTo.id : ""}
                        />
                        <DataWrapper css={''} id={1}>
                            <TicketHistoryTasbleUi
                                history={ticket.history}
                            />
                        </DataWrapper>

                    </div>
                </>
            )
    }
}