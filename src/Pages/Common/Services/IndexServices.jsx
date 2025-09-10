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
import { deleteService, getServiceTypesForSelect } from "../../../Js/FetchFunctions";
import Error from "../../../Components/dumb/Error";

export default function IndexServices() {
    const { throwMessage, setLoader } = useMessageContext();
    const { currentUser, prefix } = useAuthContext();
    const { setFiltersConfig, buildQuery, refreshKey, handleRefresh } = useFiltersContext()
    const navigate = useNavigate();
    const token = currentUser.token;


    //configrazione table
    const config = serviceTableConfig[prefix];

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
                { key: 'status', label: 'Status', type: 'select', options: statusOptions },
                { key: 'createdAt', label: 'Created At', type: 'date' },
                { key: 'serviceType', label: 'Service Type', type: 'select', options: serviceTypes.result },
                { key: 'code', label: 'Code', type: 'text' },
            ]
            setFiltersConfig(3, page, services.pagination.totalPages, setPage, fields, filters, setFilters)

        }

    }, [services, serviceTypes, filters])


    //fetch per tipologica service type
    useEffect(() => {
        getServiceTypesForSelect(token, setServiceTypes, throwMessage)
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
                console.log(data);
                if (data.state && data.state == 'success') {
                    setServices({
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

    const routeConfig = crudRoutesConfig[prefix]

    function handleDelete(itemId) {
        deleteService(itemId, token, setLoader, throwMessage, handleRefresh)
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
                    <Error message={services.message} />
                </>
            )
        case 'success':
            return (
                <>
                    <div className="container my-5">
                        <h1>Services</h1>
                        {
                            prefix == 'admin' && <div>
                                <button onClick={() => navigate(`/admin/service/create`)} className="btn btn-outline-success">+ Create Service</button>
                            </div>
                        }

                        <DataWrapper css={'mt-5'} id={3}>
                            <ServiceTable config={config} data={services.result} onDelete={handleDelete} onEdit={handleUpdate} onShow={handleShow} />
                        </DataWrapper>


                    </div>
                </>
            )
    }
}