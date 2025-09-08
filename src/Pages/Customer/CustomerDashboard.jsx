import { useEffect, useState } from "react"
import LoaderUi from "../../Components/dumb/Loader.ui"
import { useMessageContext } from "../../Contexts/MessageContext"
import { useAuthContext } from "../../Contexts/AuthContext"
import { useFiltersContext } from "../../Contexts/FiltersContext"
import DashBoard from "../../Components/smart/DashBoard";
import { Role } from "../../Js/Roles";
import Error from "../../Components/dumb/Error";
import ShowServiceTicketListUi from "../../Components/dumb/ShowServiceTicketList.ui";
import LoaderMiniUi from "../../Components/dumb/LoaderMini.ui"
import { crudRoutesConfig } from "../../Js/CrudRoutesConfig"
import { useNavigate } from "react-router-dom"
import { Status } from "../../Js/TicketStatus"
import { getAllServicesForSelect } from "../../Js/FetchFunctions"
import DataWrapper from "../../Components/smart/DataWrapper"

export default function CustomerDashboard() {

    const { currentUser, prefix } = useAuthContext()
    const { throwMessage, setLoader } = useMessageContext()
    const { setFiltersConfig, buildQuery, refreshKey, onChangeRefreshKey } = useFiltersContext()
    const routeConfig = crudRoutesConfig[prefix]
    const token = currentUser.token
    const navigate = useNavigate()


    const [stats, setStats] = useState({
        state: 'loading',
        servicesData: [
            { name: 'No Data', value: 1, fill: '#000000ff' }
        ],
        ticketsData: [
            { name: 'No Data', value: 1, fill: '#000000ff' }
        ],
        usersData: [
            { name: 'No Data', value: 1, fill: '#000000ff' }
        ]
    })

    const [tickets, setTickets] = useState({
        state: 'loading'
    })

    //setting filtri
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

    const fields = [
        { key: 'status', label: 'Ticket Status', type: 'select', options: statusOptions },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'text' },
        { key: 'createdAt', label: 'Created At', type: 'date' },
        { key: 'serviceId', label: 'Service', type: 'select', options: services.result }
    ]

    useEffect(() => {
        if (tickets.state == 'success' && services.state == 'success') {
            setFiltersConfig(1, page, tickets.pagination.totalPages, setPage, fields, filters, setFilters)
        }

    }, [tickets, services, onChangeRefreshKey])


    //fetch ai services per filtri
    useEffect(() => {
        getAllServicesForSelect(token, throwMessage, setServices)
    }, [])

    //fetch per le stats
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/stats/customer`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${currentUser.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                setStats({
                    state: 'success',
                    servicesData: [
                        { name: 'Active Services', value: data.activeServices, fill: '#00C49F' }
                    ],
                    ticketsData: [
                        { name: 'Pending Tickets', value: data.pendingTickets, fill: '#c4009aff' },
                        { name: 'Resolved Tickets', value: data.resolvedTickets, fill: '#02ddcbff' },
                        { name: 'Working Tickets', value: data.workingTickets, fill: '#029fddff' }
                    ]
                })
                if (data.state && data.state == "expired") {
                    throwMessage('expired', [data.error])

                } else if (data.error) {
                    throwMessage('error', [JSON.stringify(data)])
                }
            })
            .catch(err => {
                setStats({
                    state: 'error',
                    message: err.message
                })
                throwMessage('error', [err.message])
            })
            .finally(() => {
                setLoader(false)
            })

    }, [refreshKey])


    //fetch ai tt
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/tickets?page=${page}${buildQuery(filters)}`, {
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
                throwMessage('error', [err.message])
            })
            .finally(() => {
                setLoader(false)
            })
    }, [page, refreshKey])


    function handleTicketShow(tId) {
        navigate(routeConfig.ticketShow(tId))
    }



    switch (stats.state) {
        case 'loading':
            return (
                <>
                    <LoaderUi />
                </>
            )
        case 'error':
            return (
                <Error message={stats.message} />
            )
        case 'success':
            return (
                <>

                    <DashBoard
                        servicesData={stats.servicesData}
                        ticketsData={stats.ticketsData}
                        usersData={stats.usersData}
                        role={Role.CUSTOMER}
                    />
                    {
                        tickets.state == 'loading' && <LoaderMiniUi />
                    }
                    {
                        tickets.state == 'error' && throwMessage('error', [tickets.message])
                    }
                    {
                        tickets.state == 'success' && (
                            <>
                                <div className="container">
                                    <DataWrapper css={''} id={1}>
                                        <ShowServiceTicketListUi
                                            tickets={tickets.result}
                                            handleTicketsDelete={null}
                                            handleTicketEdit={null}
                                            handleTicketShow={handleTicketShow}
                                            showDelete={false}
                                            showEdit={false}
                                            showShow={true}
                                        />
                                    </DataWrapper>

                                </div>
                            </>
                        )
                    }

                </>
            )
    }
}