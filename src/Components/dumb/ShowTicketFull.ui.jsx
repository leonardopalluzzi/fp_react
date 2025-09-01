import { useNavigate } from "react-router-dom"

export default function ShowTicketFullUi({ ticket }) {
    const navigate = useNavigate()
    return (
        <>

            <h1>Ticket Info</h1>
            <div className="card p-4 shadow">
                <div className="row row-cols-1 row-cols-md-2">
                    <div className="col">
                        <label htmlFor="">Title:</label>
                        <h2>{ticket.title}</h2>

                        <label htmlFor="">Status:</label>
                        <h3>{ticket.status}</h3>

                        <label htmlFor="">Type:</label>
                        <h5>{ticket.type.name}</h5>

                        <label htmlFor="">Created At:</label>
                        <h5>{ticket.createdAt}</h5>

                        <div>
                            <label htmlFor="">For Service:</label>
                            <div className="d-flex align-items-center justify-content-start gap-4">
                                <h5>{ticket.service.name}</h5>
                                <button className="btn btn-outline-primary" onClick={() => navigate(`/admin/service/${ticket.service.id}`)}><i class="bi bi-eye"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <label className="text-decoration-underline" htmlFor="">Description:</label>
                        <p className="border rounded rounded-4 p-2 my-3">{ticket.description}</p>
                    </div>
                </div>


                <div className="row row-cols-1 row-cols-md-2 my-5">
                    <div className="col">
                        <div className="border rounded rounded-4 p-3 bg-light shadow">
                            <h3 htmlFor="">Requester:</h3>
                            <div className="container">
                                <label htmlFor="">Username:</label>
                                <h5>{ticket.requester.username}</h5>

                                <label htmlFor="">Email:</label>
                                <h5>{ticket.requester.email}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="border rounded rounded-4 p-3 bg-light shadow">
                            <h3 htmlFor="">Assigned To:</h3>
                            {
                                ticket.assignedTo != null ? (
                                    <>
                                        <div className="container">
                                            <label htmlFor="">Username:</label>
                                            <h5>{ticket.assignedTo.username}</h5>

                                            <label htmlFor="">Email:</label>
                                            <h5>{ticket.assignedTo.email}</h5>
                                        </div>
                                    </>
                                ) : (<>-</>)
                            }

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}