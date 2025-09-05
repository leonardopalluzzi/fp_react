import { useState, useEffect } from "react"
import { useAuthContext } from '../../../Contexts/AuthContext';
import { useMessageContext } from "../../../Contexts/MessageContext";
import LoaderUi from "../../../Components/dumb/Loader.ui";
import ServiceTable from "../../../Components/smart/ServiceTable";
import { serviceTableConfig } from "../../../Js/ServiceTableConfig";
import { useNavigate } from "react-router-dom";
import { crudRoutesConfig } from "../../../Js/CrudRoutesConfig";
import DataWrapper from "../../../Components/smart/DataWrapper";
import { useFiltersContext } from "../../../Contexts/FiltersContext";
import { Status } from "../../../Js/ServiceStatus";

export default function AdminServices() {
    const { throwMessage, setLoader } = useMessageContext();
    const { currentUser } = useAuthContext();
    const { setFiltersConfig, buildQuery, refreshKey } = useFiltersContext()
    const navigate = useNavigate();
    const token = currentUser.token;


    //configrazione table
    const config = serviceTableConfig['admin'];

    const [services, setServices] = useState({
        state: 'loading'
    })


    //configurazione filtri
    const [page, setPage] = useState(0)
    const [filters, setFilters] = useState({})
    const [serviceTypes, setServiceTypes] = useState({
        state: 'loading'
    })

    useEffect(() => {
        if (services.state == 'success' && serviceTypes.state == 'success') {

            const statusOptions = []

            for (const key in Status) {
                const option = { key: key, label: key }
                statusOptions.push(option)
            }

            const fields = [
                { key: 'name', label: 'Name', type: 'text' },
                { key: 'description', label: 'Description', type: 'text' },
                { key: 'status', label: 'Status', type: 'option', options: statusOptions },
                { key: 'createdAt', label: 'Created At', type: 'date' },
                { key: 'serviceType', label: 'Service Type', type: 'select', options: serviceTypes.result },
                { key: 'code', label: 'Code', type: 'text' },
            ]
            setFiltersConfig(3, page, services.pagination.totalPages, setPage, fields, filters, setFilters)

        }

    }, [services, serviceTypes, filters])


    //fetch per tipologica service type
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/tipologies/servicetypes`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.state && data.state == 'expired') {
                    throwMessage('expired', [data.error])
                } else if (data.state && data.state == 'error') {
                    throwMessage('error', [data.error])
                }
                console.log(data);

                setServiceTypes({
                    state: 'success',
                    result: data.map(s => (
                        { key: s.id, label: s.name }
                    ))
                })
            })
            .catch(err => {
                setServiceTypes({
                    state: 'error',
                    message: err.message
                })
                throwMessage('error', [err.message])
            })
    }, [])

    // fetch dati
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/services?page=${page}${buildQuery(filters)}`, {
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
                    console.log(data);

                    setServices({
                        state: 'success',
                        result: data.result.content,
                        pagination: data.result
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
            .finally(() => {
                setLoader(false)
            })
    }, [page, refreshKey])

    const routeConfig = crudRoutesConfig['admin']

    function handleDelete(itemId) {
        console.log(`cancellazione servizio: ${itemId}`);

        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/services/delete/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status == 'OK') {
                    throwMessage('success', ['Item Deleted Correctly'])
                }

            })
            .catch(err => {
                throwMessage('error', [err.message])
            })
    }

    function handleUpdate(itemId) {
        return navigate(routeConfig.serviceEdit(itemId));

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
                        <h1>Services</h1>
                        <div>
                            <button onClick={() => navigate(`/admin/service/create`)} className="btn btn-outline-success">+ Create Service</button>
                        </div>
                        <DataWrapper css={'mt-5'} id={3}>
                            <ServiceTable config={config} data={services.result} onDelete={handleDelete} onEdit={handleUpdate} onShow={handleShow} />
                        </DataWrapper>


                    </div>
                </>
            )
    }
}