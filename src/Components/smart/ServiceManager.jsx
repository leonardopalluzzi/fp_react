import { useState } from "react"
import { assignOperatorToService, deleteOperatorFromService, registerCustomerToService, deleteCustomerFromService } from '../../Js/FetchFunctions'
import ModalServiceManager from "./ModalServiceManager"
import { useNavigate } from "react-router-dom"
import DeleteModalUi from "../dumb/DeleteModal.ui"
import { useMessageContext } from "../../Contexts/MessageContext"
import { useFiltersContext } from "../../Contexts/FiltersContext"

export default function ServiceManager({ currentUser, serviceId, companyId, prefix }) {
    const token = currentUser.token
    const navigate = useNavigate()
    const { throwMessage, setLoader } = useMessageContext()
    const { handleRefresh } = useFiltersContext()

    const [modalConfig, setModalConfig] = useState({})
    const [display, setDisplay] = useState(false)
    const [endpoint, setEndpoint] = useState('')

    function handleShowModal(config) {
        setDisplay(true)
        setEndpoint(
            config == 'assignOperator' && `${import.meta.env.VITE_BACK_URL}/api/v1/users/manage/byCompany/${companyId}/service/${serviceId}?exclude=true&` ||
            config == 'deleteOperator' && `${import.meta.env.VITE_BACK_URL}/api/v1/users/manage/byService/${serviceId}?` ||
            config == 'deleteCustomer' && `${import.meta.env.VITE_BACK_URL}/api/v1/users/manage/byService/customers/${serviceId}?`
        )
        setModalConfig(propsConfig[config])
    }

    const propsConfig = {
        assignOperator: {
            token: token,
            function: assignOperatorToService,
            title: 'Assign Operator',
            label: 'Assign',
            setDisplay: setDisplay,
            serviceId: serviceId,
            list: 'operators' //serve per fetch dati iniziale
        },
        deleteOperator: {
            token: token,
            function: deleteOperatorFromService,
            title: 'Delete Operator',
            label: 'Delete',
            setDisplay: setDisplay,
            serviceId: serviceId,
            list: 'operators' //serve per fetch dati iniziale
        },
        deleteCustomer: {
            token: token,
            function: deleteCustomerFromService,
            title: 'Delete Customer',
            label: 'Delete',
            setDisplay: setDisplay,
            serviceId: serviceId,
            list: 'customers' //serve per fetch dati iniziale
        }
    }

    function handleDetachCustomerFromService(sId) {
        return deleteCustomerFromService(token, sId, currentUser.details.id, setLoader, throwMessage, handleRefresh, navigate, prefix)
    }

    switch (prefix) {
        case 'customer':
            return (
                <>
                    <div className="card border-0 shadow p-4 ">
                        <div className="border p-3 rounded rounded-3 d-flex flex-column align-items-center justify-content-center">
                            <h3>Unregister from the current service</h3>
                            <DeleteModalUi itemId={serviceId} deleteFunction={async (id) => handleDetachCustomerFromService(id)} />
                        </div>
                    </div>

                </>
            )
        case 'admin':
            return (
                <>
                    <div className="card border-0 shadow p-4">
                        <div className="row row-cols-1 row-cols-md-4">
                            <div className="col">
                                <button className="btn btn-outline-success" onClick={() => navigate(`/admin/user/create/${serviceId}`)}>+ Add Operator</button>
                                <label className="mt-3 text-muted">Create a new operator</label>
                            </div>
                            <div className="col">
                                <button className="btn btn-outline-success" onClick={() => handleShowModal('assignOperator')}>add operator to service</button>
                                <label className="mt-3 text-muted">Add an existing operator</label>
                            </div>
                            <div className="col">
                                <button className="btn btn-outline-danger" onClick={() => handleShowModal('deleteOperator')}>delete operator from service</button>
                                <label className="mt-3 text-muted">Detach an operator from this service</label>
                            </div>
                            <div className="col">
                                <button className="btn btn-outline-danger" onClick={() => handleShowModal('deleteCustomer')}>delete customer from service</button>
                                <label className="mt-3 text-muted">Detach a customer from this service</label>
                            </div>
                        </div>

                        {/* modal */}
                        {
                            display && <ModalServiceManager {...modalConfig} endpoint={endpoint} />
                        }

                    </div>

                </>
            )
    }
}