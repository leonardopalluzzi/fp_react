import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useState, useEffect } from "react"
import LoaderUi from "../../../Components/dumb/Loader.ui"
import ShowServiceTicketListUi from "../../../Components/dumb/ShowServiceTicketList.ui"
import DataWrapper from "../../../Components/smart/DataWrapper"
import { Status } from "../../../Js/TicketStatus"
import { useFiltersContext } from "../../../Contexts/FiltersContext"
import { crudRoutesConfig } from "../../../Js/CrudRoutesConfig"
import { useNavigate } from "react-router-dom"
import { getAllServicesForSelect } from "../../../Js/FetchFunctions"
import Error from "../../../Components/dumb/Error"

export default function TicketsPool() {
    const { throwMessage, setLoader } = useMessageContext()
    const { currentUser, prefix } = useAuthContext()
    const { setFiltersConfig, buildQuery, refreshKey } = useFiltersContext()
    const token = currentUser.token
    const routeConfig = crudRoutesConfig[prefix]
    const navigate = useNavigate()

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
        getAllServicesForSelect(token, throwMessage, setServices)
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

                if (data.state && data.state == 'success') {
                    setTickets({
                        state: 'success',
                        result: data.result.content,
                        pagination: data.result
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
                throwMessage('error', [err.message])
            })
            .finally(() => {
                setLoader(false)
            })
    }, [page, refreshKey])

    function handleTicketEdit(tId) {
        return navigate(routeConfig.ticketEdit(tId, serviceId)) // da prender il serviceId
    }

    function handleTicketShow(tId) {
        return navigate(routeConfig.ticketShow(tId))
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
                    <Error message={tickets.message} />
                </>
            )
        case 'success':
            return (
                <>
                    <div className="container my-5">
                        <h1>Tickets Pool</h1>
                        <p>Here you can see all the open tickets that are note assigned to an operator</p>
                        <DataWrapper css={''} id={1}>
                            <ShowServiceTicketListUi
                                tickets={tickets.result}
                                handleTicketEdit={handleTicketEdit}
                                handleTicketShow={handleTicketShow}
                                handleTicketsDelete={handleTicketDelete}
                                showDelete={true}
                                showEdit={prefix == 'admin' ? true : false}
                                showShow={true}
                            />
                        </DataWrapper>
                    </div>

                </>
            )
    }
}