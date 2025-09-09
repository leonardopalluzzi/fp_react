import DeleteModalUi from "./DeleteModal.ui"
import { formatDate } from "../../Js/UtilFunctions";

export default function ShowServiceTicketListUi({ tickets, handleTicketsDelete, handleTicketShow, handleTicketEdit, showEdit, showDelete, showShow }) {
    console.log(tickets);

    return (
        <>
            {/* tabella tickets  */}
            <div className="w-100 my-5 bg-white rounded rounded-4 p-4 shadow">
                <h3>Tickets</h3>
                <div
                    class="table-responsive"
                >
                    <table
                        class="table table-white"
                    >
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Type</th>
                                <th scope="col">Status</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tickets.map(t => (
                                    <>
                                        <tr class="">
                                            <td scope="row">{t.title}</td>
                                            <td>{t.type.name}</td>
                                            <td>{t.status}</td>
                                            <td>{formatDate(t.createdAt)}</td>
                                            <td>
                                                <div className="d-flex align-items-center justify-content-center gap-2">
                                                    {
                                                        showShow && <button onClick={() => handleTicketShow(t.id)} className="btn btn-primary"><i class="bi bi-eye-fill"></i></button>
                                                    }
                                                    
                                                    {
                                                        showEdit && (
                                                        <>
                                                        {t.serviceId ? (
                                                            <>
                                                                <button onClick={() => handleTicketEdit(t.id, t.serviceId)} className="btn btn-warning"><i class="bi bi-pencil-square"></i></button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button onClick={() => handleTicketEdit(t.id, t.service.id)} className="btn btn-warning"><i class="bi bi-pencil-square"></i></button>
                                                            </>
                                                        )}
                                                        </>
                                                        )
                                                    }
                                                    
                                                    {
                                                        showDelete && <DeleteModalUi itemId={t.id} deleteFunction={handleTicketsDelete} />
                                                    }
                                                    
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                ))
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}