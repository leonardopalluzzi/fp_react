import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useState, useEffect } from "react"
import LoaderUi from "../../../Components/dumb/Loader.ui"
import ShowServiceTicketListUi from "../../../Components/dumb/ShowServiceTicketList.ui"
import { useNavigate } from "react-router-dom"
import DataWrapper from "../../../Components/smart/DataWrapper"
import { Status } from '../../../Js/TicketStatus'
import { useFiltersContext } from "../../../Contexts/FiltersContext"
import { deleteTicket } from '../../../Js/FetchFunctions'
import { crudRoutesConfig } from '../../../Js/CrudRoutesConfig'
import { getAllServicesForSelect } from "../../../Js/FetchFunctions"
import Error from "../../../Components/dumb/Error"


export default function AdminTickets() {
    const { throwMessage, setLoader } = useMessageContext()
    const { currentUser, prefix } = useAuthContext()
    const { setFiltersConfig, buildQuery, refreshKey, handleRefresh } = useFiltersContext()
    const token = currentUser.token
    const navigate = useNavigate()
    const routeConfig = crudRoutesConfig[prefix]

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


    // fetch per lista servizi per select filtri
    useEffect(() => {
        getAllServicesForSelect(token, throwMessage, setServices)
    }, [])



    //fetch dati
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/tickets/manage/operatorList?page=${page}${buildQuery(filters)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.state && data.state == 'success') {
                    setTickets({
                        state: 'success',
                        pagination: data.result,
                        result: data.result.content
                    })
                } else if (data.state) {
                    throwMessage(data.state, [data.message])
                } else {
                    throwMessage('error', ['Unknown Error'])
                }
            })
            .catch(err => {
                setTickets({
                    state: 'error',
                    message: err.message
                })
            })
            .finally(() => {
                setLoader(false)
            })
    }, [page, refreshKey])

    function handleTicketEdit(tId, sId) {
        return navigate(routeConfig.ticketEdit(tId, sId))

    }

    function handleTicketShow(tId) {
        return navigate(routeConfig.ticketShow(tId))
    }

    function handleTicketDelete(tId) {
        deleteTicket(tId, token, throwMessage, setLoader, handleRefresh)

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
                    <Error message={tickets.message} />
                </>
            )
        case 'success':
            return (
                <>
                    <div className="container my-5">
                        <h1>Assigned Tickets</h1>
                        <p>Here you can see all the currently assigned tickets</p>
                        <DataWrapper css={''} id={1}>

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