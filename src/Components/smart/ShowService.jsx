import { Role } from "../../Js/Roles";
import ShowServiceAdminListUi from "../dumb/ShowServiceAdminLists.ui";
import ShowServiceTicketListUi from "../dumb/ShowServiceTicketList.ui";
import { useNavigate } from "react-router-dom";
import { crudRoutesConfig } from "../../Js/CrudRoutesConfig";
import DataWrapper from "./DataWrapper";
import { useState, useEffect } from "react";
import { Status } from "../../Js/TicketStatus";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useFiltersContext } from "../../Contexts/FiltersContext";
import { useMessageContext } from "../../Contexts/MessageContext";
import ServiceManager from "./ServiceManager";
import { deleteTicket, deleteUser } from "../../Js/FetchFunctions";
import LoaderMiniUi from "../dumb/LoaderMini.ui";
import { formatDate } from "../../Js/UtilFunctions";

export default function ShowService({ roles, service }) {
    const { currentUser, prefix } = useAuthContext()
    const token = currentUser.token
    const { setFiltersConfig, buildQuery, refreshKey, handleRefresh, onChangeRefreshKey } = useFiltersContext()
    const { throwMessage, setLoader } = useMessageContext()

    const navigate = useNavigate()
    const routeConfig = crudRoutesConfig[prefix]


    const [tickets, setTickets] = useState({
        state: 'loading'
    })
    const [operators, setOperators] = useState({
        state: 'loading'
    })
    const [customers, setCustomers] = useState({
        state: 'loading'
    })

    //filtri e paginazione
    const [page, setPage] = useState(0)
    const [filters, setFilters] = useState({})

    const [operatorsPage, setOperatorsPage] = useState(0)
    const [operatorsFilters, setOperatorsFilters] = useState({})

    const [customersPage, setCustomersPage] = useState(0)
    const [customersFilters, setCustomersFilters] = useState({})

    const [usersLoader, setUsersLoader] = useState('loading')

    //state loader globale per i fetch a customers e operators
    useEffect(() => {
        if (operators.state == 'success' && customers.state == 'success') {
            setUsersLoader('success')
        } else if (operators.state == 'error' || operators.state == 'error') {
            setUsersLoader('error')
        }

    }, [operators, customers])

    //config filtri lista tickets
    useEffect(() => {
        if (tickets.state == 'success') {

            const statusOptions = []

            for (const key in Status) {
                const option = { key: key, label: key }
                statusOptions.push(option)
            }

            const ticketsFields = [
                { key: 'status', label: 'Ticket Status', type: 'select', options: statusOptions },
                { key: 'title', label: 'Title', type: 'text' },
                { key: 'description', label: 'Description', type: 'text' },
                { key: 'createdAt', label: 'Created At', type: 'date' }
            ]

            setFiltersConfig('ticketConfig', page, tickets.pagination.totalPages, setPage, ticketsFields, filters, setFilters)
        }

    }, [tickets, onChangeRefreshKey])


    // config filtri users
    const usersFields = [
        { key: 'username', label: 'Username', type: 'text' },
        { key: 'email', label: 'email', type: 'text' }

    ]
    //config filtri operators
    useEffect(() => {
        if (operators.state == 'success') {
            setFiltersConfig(2, operatorsPage, operators.pagination.totalPages, setOperatorsPage, usersFields, operatorsFilters, setOperatorsFilters)
        }
    }, [operators, onChangeRefreshKey])

    //config filtri customers
    useEffect(() => {
        if (customers.state == 'success') {
            setFiltersConfig(1, customersPage, customers.pagination.totalPages, setCustomersPage, usersFields, customersFilters, setCustomersFilters)
        }
    }, [customers, onChangeRefreshKey])

    //get operators by service con filtri
    useEffect(() => {
        if (prefix != 'customer') {
            fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/users/manage/byService/${service.id}?page=${operatorsPage}${buildQuery(operatorsFilters)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.state && data.state == 'success') {
                        setOperators({
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
                    setOperators({
                        state: 'error',
                        message: err.message
                    })
                })
        }
    }, [operatorsPage, refreshKey])

    //get customer by service (da implementare in backend)
    useEffect(() => {
        if (prefix != 'customer') {
            fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/users/manage/byService/customers/${service.id}?page=${customersPage}${buildQuery(customersFilters)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.state && data.state == 'success') {
                        setCustomers({
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
                    setCustomers({
                        state: 'error',
                        message: err.message
                    })
                })
        }
    }, [customersPage, refreshKey])


    //fetch tickets
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/tickets?page=${page}&serviceId=${service.id}${buildQuery(filters)}`, {
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
                    pagination: data.result,
                    result: data.result.content
                })
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


    // operators
    function handleOperatorDelete(uId) {
        deleteUser(uId, token, throwMessage, setLoader, handleRefresh)
    }

    function handleOperatorEdit(uId) {
        return navigate(routeConfig.userEdit(uId))
    }

    function handleOperatorShow(uId) {
        return navigate(routeConfig.userShow(uId))
    }


    //tickets
    function handleTicketDelete(tId) {
        deleteTicket(tId, token, throwMessage, setLoader, handleRefresh)

    }

    function handleTicketEdit(tId) {
        return navigate(routeConfig.ticketEdit(tId, service.id))
    }

    function handleTicketShow(tId) {
        return navigate(routeConfig.ticketShow(tId))
    }

    return (
        <>

            <div className="container my-5">
                <div className="d-flex aling-items-center justify-content-between my-4">
                    <h1>Service Info</h1>
                    <button onClick={() => navigate(`/${prefix}/ticket/create/${service.id}`)} className="btn btn-outline-success">+ Create Ticket</button>

                </div>
                <div className="card border-0 p-4 shadow">
                    <label className="mt-3" htmlFor="">Name:</label>
                    <h3>{service.name}</h3>

                    <label className="mt-3" htmlFor="">Description:</label>
                    <p className="fs-4">{service.description}</p>

                    <label className="mt-3" htmlFor="">Code:</label>
                    <h4>{service.code}</h4>

                    <label className="mt-3" htmlFor="">Status:</label>
                    <h4>{service.status}</h4>
                    {
                        (roles.includes(Role.ADMIN) || roles.includes(Role.EMPLOYEE)) && (
                            <>
                                <label className="mt-3" htmlFor="">Created At:</label>
                                <h4>{formatDate(service.createdAt)}</h4>

                                <label className="mt-3" htmlFor="">Ticket Types:</label>
                                <ul className="list-unstyled">
                                    {
                                        service.ticketTypes.map(item => (
                                            <>
                                                <li className="fs-5">{item.name}</li>
                                            </>
                                        ))
                                    }
                                </ul>
                            </>
                        )
                    }

                </div>
                {
                    (prefix == 'admin' || prefix == 'customer') && <div className="my-5">
                        <h1>Manage Service</h1>
                        <ServiceManager currentUser={currentUser} serviceId={service.id} companyId={service.companyId} prefix={prefix} />
                    </div>
                }


                {
                    (roles.includes(Role.ADMIN)) && (
                        <>
                            {
                                usersLoader == 'loading' && <LoaderMiniUi />
                            }
                            {
                                usersLoader == 'error' && (<></>)
                            }
                            {
                                usersLoader == 'success' && <ShowServiceAdminListUi
                                    customers={customers.result}
                                    operators={operators.result}
                                    handleOperatorShow={handleOperatorShow}
                                    handleOperatorEdit={handleOperatorEdit}
                                    handleOperatorDelete={handleOperatorDelete}
                                />
                            }
                        </>
                    )
                }

                {
                    <>
                        {
                            tickets.state == 'loading' && <LoaderMiniUi />
                        }
                        {
                            tickets.state == 'error' && (<></>)
                        }
                        {
                            tickets.state == 'success' && (
                                <>
                                    <DataWrapper css={'my-4'} id={'ticketConfig'}>
                                        <ShowServiceTicketListUi
                                            tickets={tickets.result}
                                            handleTicketsDelete={handleTicketDelete}
                                            handleTicketShow={handleTicketShow}
                                            handleTicketEdit={handleTicketEdit}
                                            showShow={true}
                                            showEdit={prefix == 'admin' ? true : false}
                                            showDelete={true}
                                        />
                                    </DataWrapper>
                                </>
                            )
                        }

                    </>
                }
            </div >
        </>
    )
}