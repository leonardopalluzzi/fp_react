import AssignTIcketToOperator from "./AssignTicketToOperator"
import UpdateTicketHistory from "./UpdateTicketHistory"
import { Role } from '../../Js/Roles'
import { useNavigate } from "react-router-dom"

export default function TicketManager({ currentUser, serviceId, ticketId, ticketStatus, currentAssignee }) {
    //logica di role check
    const isSuperAdmin = currentUser.details.roles.includes(Role.SUPERADMIN)
    const isAdmin = currentUser.details.roles.includes(Role.ADMIN)
    const isEmployee = currentUser.details.roles.includes(Role.EMPLOYEE)
    const isCustomer = currentUser.details.roles.includes(Role.CUSTOMER)

    const navigate = useNavigate()

    if (isAdmin || isSuperAdmin) {
        return (
            <>
                <div className="card border-0 shadow p-4 my-5">
                    <h3 className="mb-5">Manage Ticket</h3>
                    <div className="row row-cols-1 row-cols-md-3 align-items-center">
                        <div className="col align-items-center justify-content-center">
                            <div className="border rounded rounded-3 p-4 h-100">
                                <label className="mb-3">Assign ticket to an operator</label>
                                <AssignTIcketToOperator
                                    currentUser={currentUser}
                                    serviceId={serviceId}
                                    ticketId={ticketId}
                                    currentAssignee={currentAssignee}
                                />
                            </div>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <div className="border rounded rounded-3 p-4 h-100">
                                <UpdateTicketHistory
                                    currentUser={currentUser}
                                    ticketId={ticketId}
                                    ticketStatus={ticketStatus}
                                />
                            </div>
                        </div>
                        <div className="col text-center">
                            <div className="border rounded rounded-3 p-4 h-100">
                                <button onClick={() => navigate(`/admin/ticket/edit/${ticketId}`)} className="btn btn-warning"><i class="bi bi-pencil-square"></i> Edit Ticket</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if (isEmployee) {
        return (
            <>
                <div className="card border-0 shadow p-4 my-5">
                    <h3 className="mb-5">Manage Ticket</h3>
                    <div className="row row-cols-1 row-cols-md-2 align-items-center">
                        <div className="col align-items-center justify-content-center">
                            <div className="border rounded rounded-3 p-4 h-100">
                                <label className="mb-3">Assign ticket to an operator</label>
                                <AssignTIcketToOperator
                                    currentUser={currentUser}
                                    serviceId={serviceId}
                                    ticketId={ticketId}
                                    currentAssignee={currentAssignee}
                                />
                            </div>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <div className="border rounded rounded-3 p-4 h-100">
                                <UpdateTicketHistory
                                    currentUser={currentUser}
                                    ticketId={ticketId}
                                    ticketStatus={ticketStatus}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if (isCustomer) {
        return (
            <>
                <div className="card border-0 shadow p-4 my-5">
                    <h3 className="mb-5">Manage Ticket</h3>
                    <div className="row row-cols-1 align-items-center">
                        <div className="col d-flex align-items-center justify-content-center">
                            <div className="border rounded rounded-3 p-4 h-100">
                                <UpdateTicketHistory
                                    currentUser={currentUser}
                                    ticketId={ticketId}
                                    ticketStatus={ticketStatus}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}