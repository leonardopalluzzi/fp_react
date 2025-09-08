import { registerCustomerToService } from "../../Js/FetchFunctions";
import { useMessageContext } from "../../Contexts/MessageContext";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useFiltersContext } from "../../Contexts/FiltersContext";
import { useState } from "react";

export default function RegisterCustomerToService() {
    const { currentUser } = useAuthContext()
    const { throwMessage, setLoader } = useMessageContext()
    const { handleRefresh } = useFiltersContext()
    const token = currentUser.token
    const [payload, setPayload] = useState({
        userId: currentUser.details.id,
        serviceCode: ''
    })

    function handleChange(key, value) {
        setPayload({
            ...payload,
            [key]: value
        })
    }

    function handleSubmit() {
        setLoader(true)
        const payloadToSend = { ...payload }
        registerCustomerToService(token, payloadToSend, setLoader, throwMessage, handleRefresh)
        setPayload({
            userId: currentUser.details.id,
            serviceCode: ''
        })

    }

    return (
        <>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="d-flex align-items-center gap-3 justify-content-center">
                <div>
                    <small for="basic-url" className="form-label">Register a service</small>
                    <div className="input-group">
                        <input value={payload.serviceCode} name="serviceCode" onChange={(e) => handleChange(e.target.name, e.target.value)} type="text" class="form-control" placeholder="Service Code" aria-label="Recipient’s username" aria-describedby="button-addon2" />
                        <button class="btn btn-outline-success" type="submit" id="button-addon2">Register</button>
                    </div>
                    <div className="form-text" id="basic-addon4">Register to a service by submitting the provided code</div>
                </div>
            </form>
        </>
    )
}