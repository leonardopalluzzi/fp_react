import { useState, useEffect } from "react"
import { useAuthContext } from '../../../Contexts/AuthContext';
import { useMessageContext } from "../../../Contexts/MessageContext";
import LoaderUi from "../../../Components/dumb/Loader.ui";
import ServiceTable from "../../../Components/smart/ServiceTable";
import { serviceTableConfig } from "../../../Js/ServiceTableConfig";
import { useNavigate } from "react-router-dom";
import { crudRoutesConfig } from "../../../Js/CrudRoutesConfig";

export default function AdminServices() {
    const { throwMessage } = useMessageContext();
    const { currentUser } = useAuthContext();
    const navigate = useNavigate();
    const token = currentUser.token;

    //configrazione table
    const config = serviceTableConfig['admin'];

    const [services, setServices] = useState({
        state: 'loading'
    })

    // fetch dati
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/services`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.state && data.state == "expired") {
                    throwMessage('expired', [data.error])

                } else if (data.error) {
                    throwMessage('error', [JSON.stringify(data)])
                }
                if (data.state != 'error' && data.state != 'expired') {
                    setServices({
                        state: 'success',
                        result: data
                    })
                } else {
                    throwMessage(data.state, [JSON.stringify(data)])
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

    const routeConfig = crudRoutesConfig['admin']

    function handleDelete(itemId) {
        console.log('delete');
    }

    function handleUpdate(itemId) {
        console.log(routeConfig.serviceEdit(itemId));

    }

    function handleShow(itemId) {
        return navigate(routeConfig.serviceShow(itemId))

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
                    <div className="container my-5">
                        <div>
                            <button className="btn btn-outline-primary">Create Service</button>
                        </div>
                        <ServiceTable config={config} data={services.result} onDelete={handleDelete} onEdit={handleUpdate} onShow={handleShow} />

                    </div>
                </>
            )
    }
}