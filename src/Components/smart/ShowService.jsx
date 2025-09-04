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

export default function ShowService({ roles, service }) {
    const { currentUser } = useAuthContext()
    const token = currentUser.token
    const { setFiltersConfig, buildQuery, refreshKey } = useFiltersContext()
    const { setLoader } = useMessageContext()

    console.log(service);


    const navigate = useNavigate()

    const roleConfigPrefix = roles.includes(Role.ADMIN) && 'admin' || roles.includes(Role.EMPLOYEE) && 'employee' || roles.includes(Role.CUSTOMER) && 'customer';
    const routeConfig = crudRoutesConfig[roleConfigPrefix]


    const [tickets, setTickets] = useState({
        state: 'loading'
    })

    //filtri e paginazione
    const [page, setPage] = useState(0)
    const [filters, setFilters] = useState({
        serviceId: service.id
    })

    useEffect(() => {
        if (tickets.state == 'success') {

            const statusOptions = []

            for (const key in Status) {
                const option = { key: key, label: key }
                statusOptions.push(option)
            }

            const fields = [
                { key: 'status', label: 'Ticket Status', type: 'select', options: statusOptions },
                { key: 'title', label: 'Title', type: 'text' },
                { key: 'description', label: 'Description', type: 'text' },
                { key: 'createdAt', label: 'Created At', type: 'date' }
            ]

            setFiltersConfig(1, page, tickets.pagination.totalPages, setPage, fields, filters, setFilters)


        }

    }, [tickets, filters])


    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/tickets?page=${page}${buildQuery(filters)}`, {
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
            .finally(() => {
                setLoader(false)
            })
    }, [page, refreshKey])


    // operators
    function handleOperatorDelete(itemId) {
        console.log('operator delete');
    }

    function handleOperatorEdit(itemId) {
        return navigate(routeConfig.userEdit(itemId))
    }

    function handleOperatorShow(itemId) {
        return navigate(routeConfig.usershow(itemId))
    }


    //tickets
    function handleTicketDelete(itemId) {
        console.log('ticket delete');

    }

    function handleTicketEdit(itemId) {
        return navigate(routeConfig.ticketEdit(itemId))
    }

    function handleTicketShow(itemId) {
        return navigate(routeConfig.ticketShow(itemId))
    }

    return (
        <>

            <div className="container my-5">
                <div className="d-flex aling-items-center justify-content-between my-4">
                    <h1>Service Info</h1>
                    <button onClick={() => navigate(`/${roleConfigPrefix}/ticket/create/${service.id}`)} className="btn btn-outline-success">+ Create Ticket</button>

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
                                <h4>{service.createdAt}</h4>

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
                <div className="my-5">
                    <h1>Manage Service</h1>
                    <ServiceManager currentUser={currentUser} serviceId={service.id} companyId={service.companyId} />
                </div>

                {
                    (roles.includes(Role.ADMIN)) && (
                        <>
                            <ShowServiceAdminListUi
                                customers={service.customers}
                                operators={service.operators}
                                handleOperatorShow={handleOperatorShow}
                                handleOperatorEdit={handleOperatorEdit}
                                handleOperatorDelete={handleOperatorDelete}
                            />
                        </>
                    )
                }

                {
                    (roles.includes(Role.ADMIN) || roles.includes(Role.EMPLOYEE)) && (
                        <>
                            {
                                tickets.state == 'success' && (
                                    <>
                                        <DataWrapper css={'my-4'} list={1}>
                                            <ShowServiceTicketListUi
                                                tickets={tickets.result}
                                                handleTicketsDelete={handleTicketDelete}
                                                handleTicketShow={handleTicketShow}
                                                handleTicketEdit={handleTicketEdit}
                                            />
                                        </DataWrapper>
                                    </>
                                )
                            }

                        </>
                    )
                }
            </div >
        </>
    )
}