import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useState, useEffect } from "react"
import LoaderUi from "../../../Components/dumb/Loader.ui"
import ShowServiceTicketListUi from "../../../Components/dumb/ShowServiceTicketList.ui"
import DataWrapper from "../../../Components/smart/DataWrapper"
import { Status } from "../../../Js/TicketStatus"
import { useFiltersContext } from "../../../Contexts/FiltersContext"

export default function AdminTicketsPool() {
    const { throwMessage, setLoader } = useMessageContext()
    const { currentUser } = useAuthContext()
    const { setFiltersConfig, buildQuery, refreshKey } = useFiltersContext()
    const token = currentUser.token

    const [tickets, setTickets] = useState({
        state: 'loading'
    })

    const [page, setPage] = useState(0)
    const [filters, setFilters] = useState({})
    const [services, setServices] = useState({
        state: 'loading'
    })

    const statusOptions = []

    for (const key in Status) {
        const option = { value: key, label: key }
        statusOptions.push(option)
    }

    useEffect(() => {
        if (tickets.state == 'success' && services.state == 'success') {

            const fields = [
                { key: 'status', label: 'Ticket Status', type: 'select', options: statusOptions },
                { key: 'title', label: 'Title', type: 'text' },
                { key: 'description', label: 'Description', type: 'text' },
                { key: 'createdAt', label: 'Created At', type: 'date' },
                { key: 'serviceId', label: 'Service', type: 'select', options: services.result }
            ]

            setFiltersConfig(1, page, tickets.pagination.totalPages, setPage, fields, filters, setFilters)
        }

    }, [tickets, filters, services])


    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/services`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.state && (data.state == 'error' || data.state == 'expired')) {
                    throwMessage(data.state, [data.message])
                    return
                } else {
                    setServices({
                        state: 'success',
                        result: data.map(s => ({
                            value: s.id,
                            label: s.name
                        }))
                    })
                }
            })
            .catch(err => {
                throwMessage('error', [err.message])
                setServices({
                    state: 'error',
                    message: err.message
                })
            })
    }, [])




    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/tickets/manage?page=${page}${buildQuery(filters)}`, {
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
            .finally(() => {
                setLoader(false)
            })
    }, [page, refreshKey])

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
                        <DataWrapper css={''} list={1}>
                            <ShowServiceTicketListUi
                                tickets={tickets.result}
                                handleTicketEdit={handleTicketEdit}
                                handleTicketShow={handleTicketShow}
                                handleTicketsDelete={handleTicketDelete}
                            />
                        </DataWrapper>
                    </div>

                </>
            )
    }
}