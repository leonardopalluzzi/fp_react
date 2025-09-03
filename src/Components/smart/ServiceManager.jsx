import { useState } from "react"
import { assignOperatorToService, deleteOperatorFromService, registerCustomerToService, deleteCustomerFromService } from '../../Js/FetchFunctions'
import ModalServiceManager from "./ModalServiceManager"

export default function ServiceManager({ currentUser, serviceId }) {
    const token = currentUser.token

    const [modalConfig, setModalConfig] = useState({})
    const [display, setDisplay] = useState(false)

    function handleShowModal(config) {
        setDisplay(true)
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

    return (
        <>
            <div className="card border-0 shadow p-4">
                <div className="row row-cols-1 row-cols-md-3">
                    <div className="col">
                        <button className="btn btn-outline-success" onClick={() => handleShowModal('assignOperator')}>add operator to service</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-outline-danger" onClick={() => handleShowModal('deleteOperator')}>delete operator from service</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-outline-danger" onClick={() => handleShowModal('deleteCustomer')}>delete customer from service</button>
                    </div>
                </div>

                {/* modal */}
                {
                    display && <ModalServiceManager {...modalConfig} />
                }

            </div>

        </>
    )
}