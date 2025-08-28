import { useState, useEffect } from "react"
import { useAuthContext } from '../../../Contexts/AuthContext';
import { useMessageContext } from "../../../Contexts/MessageContext";
import LoaderUi from "../../../Components/dumb/Loader.ui";
import DeleteModalUi from "../../../Components/dumb/DeleteModal.ui";
import ServiceTableUi from "../../../Components/dumb/ServiceTable.ui";
import { serviceTableConfig } from "../../../Js/ServiceTableConfig";

export default function AdminServices() {
    const { throwMessage } = useMessageContext()
    const { currentUser } = useAuthContext()
    const token = currentUser.token;

    const config = serviceTableConfig['admin'];

    // fetch dati
    const [services, setServices] = useState({
        state: 'loading'
    })

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/services`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.state && data.state == "expired") {
                    throwMessage('expired', [data.error])

                } else if (data.error) {
                    throwMessage('error', [JSON.stringify(data)])
                }
                if (data.state != 'error' || data.state != 'expired') {
                    setServices({
                        state: 'success',
                        result: data
                    })
                } else {
                    throwMessage('error', [JSON.stringify(data)])
                }

            })
            .catch(err => {
                setServices({
                    state: 'error',
                    message: err.message
                })
                throwMessage('error', [err.message])
            })
    }, [])

    function handleDelete(iteId) {
        console.log('delete');

    }

    function handleUpdate() {
        console.log('update');

    }

    function handleShow() {
        console.log('show');

    }

    switch (services.state) {
        case 'loading':
            return (
                <>
                    <LoaderUi />
                </>
            )
        case 'error':
            return (
                <>

                </>
            )
        case 'success':
            return (
                <>
                    <div className="container">
                        <ServiceTableUi config={config} data={services.result} onDelete={handleDelete} onEdit={handleUpdate} onShow={handleShow} />

                    </div>
                    {/* <div className="container my-5">

                        <div>
                            <button className="btn btn-outline-primary">Create Service</button>
                        </div>

                        lista dei servizi con show edit e delete
                        <div className="table-responsive">
                            <table class="table table-light">
                                <thead>
                                    <tr>
                                        <th scope="col">ziopera</th>
                                        <th scope="col">Service Type</th>
                                        <th scope="col">Code</th>
                                        <th scope="col">Created At</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">N. of Customers</th>
                                        <th scope="col">N. of Operator</th>
                                        <th scope="col">N. of Tickets</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        services.result.map((service, i) => (
                                            <>
                                                <tr key={i}>
                                                    <td>{service.name}</td>
                                                    <td>{service.serviceType.name}</td>
                                                    <td>{service.code}</td>
                                                    <td>{service.createdAt}</td>
                                                    <td>{service.status}</td>
                                                    <td>{service.customers.length}</td>
                                                    <td>{service.operators.length}</td>
                                                    <td>{service.tickets.length}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center justify-content-start gap-3">
                                                            <button className="btn btn-primary"><i class="bi bi-eye-fill"></i></button>
                                                            <button className="btn btn-warning"><i class="bi bi-pencil-square"></i></button>
                                                            <DeleteModalUi itemId={service.id} deleteFunction={handleDelete} />

                                                        </div>

                                                    </td>
                                                </tr>
                                            </>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>


                    </div> */}

                </>
            )
    }
}