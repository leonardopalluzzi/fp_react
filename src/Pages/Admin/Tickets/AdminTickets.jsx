import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useState, useEffect } from "react"
import LoaderUi from "../../../Components/dumb/Loader.ui"
import ShowServiceTicketListUi from "../../../Components/dumb/ShowServiceTicketList.ui"
import { useNavigate } from "react-router-dom"
import DataWrapper from "../../../Components/smart/DataWrapper"
import { Status } from '../../../Js/TicketStatus'

export default function AdminTickets() {
    const { throwMessage } = useMessageContext()
    const { currentUser } = useAuthContext()
    const token = currentUser.token
    const navigate = useNavigate()

    const [tickets, setTickets] = useState({
        state: 'loading'
    })




    //paginazione e filtri
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

    let query = '';

    for (const key in filters) {
        if (filters[key] != undefined && filters[key] != '') {
            query += `&${key}=${filters[key]}`
        }
    }

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

    //fetch dati

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/tickets?page=${page}${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                setTickets({
                    state: 'success',
                    pagination: data,
                    result: data.content
                })
            })
            .catch(err => {
                setTickets({
                    state: 'error',
                    message: err.message
                })
            })
    }, [page, filters])

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

            let fields = []

            if (services.state == 'success') {
                fields = [
                    { key: 'status', label: 'Ticket Status', type: 'select', options: statusOptions },
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'description', label: 'Description', type: 'text' },
                    { key: 'createdAt', label: 'Created At', type: 'date' },
                    { key: 'serviceId', label: 'Service', type: 'select', options: services.result }
                ]
            }

            return (
                <>
                    <div className="container my-5">
                        <h1>Assigned Tickets</h1>
                        <p>Here you can see all the currently assigned tickets</p>
                        <DataWrapper page={page} setPage={setPage} pageNumber={tickets.pagination.totalPages} currentPage={page} fields={fields} values={filters} onChange={setFilters}>

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