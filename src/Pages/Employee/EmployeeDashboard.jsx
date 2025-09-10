import { useEffect, useState } from "react"
import LoaderUi from "../../Components/dumb/Loader.ui"
import { useMessageContext } from "../../Contexts/MessageContext"
import { useAuthContext } from "../../Contexts/AuthContext"
import { Status } from "../../Js/TicketStatus"
import DashBoard from "../../Components/smart/DashBoard";
import { Role } from "../../Js/Roles";
import Error from "../../Components/dumb/Error";
import { useFiltersContext } from "../../Contexts/FiltersContext";
import { getAllServicesForSelect, deleteTicket } from "../../Js/FetchFunctions"
import ShowServiceTicketListUi from "../../Components/dumb/ShowServiceTicketList.ui"
import { crudRoutesConfig } from "../../Js/CrudRoutesConfig"
import { useNavigate } from "react-router-dom"
import DataWrapper from "../../Components/smart/DataWrapper"

export default function EmployeeDashboard() {

    const { currentUser, prefix } = useAuthContext()
    const { throwMessage, setLoader } = useMessageContext()
    const { setFiltersConfig, refreshKey, onChangeRefreshKey, buildQuery, handleRefresh } = useFiltersContext()
    const token = currentUser.token
    const crudConfig = crudRoutesConfig[prefix]
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
    const [page, setPage] = useState(0)
    const [filters, setFilters] = useState({})
    const [services, setServices] = useState({
        state: 'loading'
    })

    // set fields per filtri
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

    //set config filtri
    useEffect(() => {
        if (tickets.state == 'success' && services.state == 'success') {
            setFiltersConfig(1, page, tickets.pagination.totalPages, setPage, fields, filters, setFilters)
        }

    }, [tickets, services, onChangeRefreshKey])


    // fetch per le stats
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/stats/employee`, {
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
                    ticketsData: [
                        { name: 'Assigned Tickets', value: data.assignedTickets, fill: '#00c4b0ff' },
                        { name: 'Resolved Tickets', value: data.resolvedTickets, fill: '#ddc702ff' },
                        { name: 'Unassigned Tickets', value: data.poolTickets, fill: '#ddc702ff' }
                    ],
                    usersData: [
                        { name: 'Customers Number', value: data.customerNumber, fill: '#00C49F' },
                        { name: 'Employees Number', value: data.employeeNumber, fill: '#00a6ffff' }
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

    }, [])


    //fetch ai servizi per filtri
    useEffect(() => {
        getAllServicesForSelect(token, throwMessage, setServices)
    }, [])

    //fetch ai tickets
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


    function handleTicketsDelete(tId) {
        deleteTicket(tId, token, throwMessage, setLoader, handleRefresh)
    }

    function handleTicketEdit(tId, sId) {
        throw new Error("You don't have the authority to complete this operation");
    }

    function handleTicketShow(tId) {
        navigate(crudConfig.ticketShow(tId))
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
                        role={Role.EMPLOYEE}
                    />

                    {
                        tickets.state == 'success' && (
                            <>
                                <div className="container">
                                    <h2>Your tickets</h2>
                                    <DataWrapper css={''} id={1}>
                                        <ShowServiceTicketListUi
                                            tickets={tickets.result}
                                            handleTicketsDelete={handleTicketsDelete}
                                            handleTicketEdit={handleTicketEdit}
                                            handleTicketShow={handleTicketShow}
                                            showEdit={false}
                                            showDelete={true}
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