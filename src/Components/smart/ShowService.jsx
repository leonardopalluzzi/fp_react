import { Role } from "../../Js/Roles";
import ShowServiceAdminListUi from "../dumb/ShowServiceAdminLists.ui";
import ShowServiceTicketListUi from "../dumb/ShowServiceTicketList.ui";
import { useNavigate } from "react-router-dom";
import { crudRoutesConfig } from "../../Js/CrudRoutesConfig";

export default function ShowService({ roles, service }) {

    const navigate = useNavigate()

    const roleConfig = roles.includes(Role.ADMIN) && 'admin' || roles.includes(Role.EMPLOYEE) && 'employee' || roles.includes(Role.CUSTOMER) && 'customer';
    const routeConfig = crudRoutesConfig[roleConfig]

    console.log(service.customers);


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
                <h1>Service Info</h1>
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
                            <ShowServiceTicketListUi
                                tickets={service.tickets}
                                handleTicketsDelete={handleTicketDelete}
                                handleTicketShow={handleTicketShow}
                                handleTicketEdit={handleTicketEdit}
                            />
                        </>
                    )
                }
            </div>
        </>
    )
}