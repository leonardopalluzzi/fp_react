import { useState, useEffect } from "react"
import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"
import LoaderUi from '../../../Components/dumb/Loader.ui'
import { useNavigate } from "react-router-dom"

export default function AdminCreateService() {
    const { throwMessage } = useMessageContext()
    const { currentUser } = useAuthContext()
    const token = currentUser.token
    const naviagte = useNavigate()

    const [newService, setNewService] = useState({
        name: '',
        description: '',
        serviceTypeId: 0,
        ticketTypes: ['']
    })
    const [serviceTypes, setServiceTypes] = useState({
        state: 'loading'
    })

    //fetch per tipologiche (endpoint da fare)

    //handlers change e submit
    function handleChange(key, value) {
        setNewService({
            ...newService,
            [key]: value
        })
    }

    function onChangeTicketTypes(index, value) {
        const updatedArray = [...newService.ticketTypes]
        updatedArray[index] = value

        setNewService({
            ...newService,
            ticketTypes: updatedArray
        })
    }

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
                    result: data
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


    function handleSubmit() {
        const serviceToSend = { ...newService }
        console.log(serviceToSend);


        //fetch
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/services/store`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(serviceToSend)
        })
            .then(res => res.json())
            .then(data => {

                if (data.state && data.state == 'expired') {
                    throwMessage('expired', [data.error])
                } else if (data.state && data.state == 'error') {
                    throwMessage('error', [data.error])
                }
                throwMessage('success', ['Service added Correctly'])
            })
            .catch(err => {
                throwMessage('error', [err.message])
            })
            .finally(() => {
                setNewService({
                    name: '',
                    description: '',
                    serviceTypeId: 0,
                    ticketTypes: ['']
                })
                //fare redirect se success

            })

    }

    function deleteServiceType(index) {
        const updatedArray = newService.ticketTypes
        updatedArray.length == 1 ? throwMessage('error', ['You must insert at least one ticket type']) : updatedArray.splice(index, 1)
        setNewService({
            ...newService,
            ticketTypes: updatedArray
        })
    }

    function addserviceType() {
        const updatedArray = newService.ticketTypes
        updatedArray.length == 4 ? throwMessage('error', ['You can insert a maximum of 4 tycket types']) : updatedArray.push('')
        setNewService({
            ...newService,
            ticketTypes: updatedArray
        })

    }

    switch (serviceTypes.state) {
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
                    <div className="container p-5">
                        <h1>Create a new service</h1>
                        <p>Here you can define the basic details of your service, later you will be able to configure it</p>
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Service Name</span>
                                <input value={newService.name} name="name" onChange={(e) => handleChange(e.target.name, e.target.value)} type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" required />
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">With textarea</span>
                                <textarea value={newService.description} name="description" onChange={(e) => handleChange(e.target.name, e.target.value)} class="form-control" aria-label="With textarea" placeholder="Description" required></textarea>
                            </div>

                            <div class="input-group mb-3">
                                <label class="input-group-text" for="inputGroupSelect01">Service Type</label>
                                <select value={newService.serviceTypeId} name="serviceTypeId" onChange={(e) => handleChange(e.target.name, e.target.value)} class="form-select" id="inputGroupSelect01" required>
                                    <option selected>Choose...</option>
                                    {
                                        serviceTypes.result.map((item, i) => (
                                            <>
                                                <option value={item.id}>{item.name}</option>

                                            </>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="bg-white rounded rounded-3 p-3">
                                <h5>Add Ticket Types</h5>
                                {
                                    newService.ticketTypes.map((item, i) => (
                                        <>
                                            <div key={i}>
                                                <div class="input-group my-3">
                                                    <span class="input-group-text" id="basic-addon1">Ticket Type</span>
                                                    <input value={item} name={`newService.ticketTypes[${i}]`} onChange={(e) => onChangeTicketTypes(i, e.target.value)} type="text" class="form-control" placeholder="Ticket Type" aria-label="Username" aria-describedby="basic-addon1" required />
                                                </div>

                                                <div className="d-flex aling-items-center justify-content-center gap-3">
                                                    {
                                                        i == newService.ticketTypes.length - 1 && <button onClick={() => addserviceType()} type="button" className="btn btn-primary"><i class="bi bi-file-plus"></i></button>
                                                    }

                                                    <button onClick={() => deleteServiceType(i)} type="button" className="btn btn-danger"><i class="bi bi-file-x"></i></button>
                                                </div>
                                            </div>

                                        </>
                                    ))
                                }

                            </div>

                            <div className="d-flex">
                                <button type="submit" className="btn btn-outline-success my-5 w-100">Save</button>
                            </div>
                        </form>

                    </div>
                </>
            )
    }
}