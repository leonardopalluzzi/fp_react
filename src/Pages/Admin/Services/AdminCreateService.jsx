import { useState, useEffect } from "react"
import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"

export default function AdminCreateService(){
    const {throwMessage} = useMessageContext()
    const {currentUser} = useAuthContext()
    const token = currentUser.token

    const [newService, setNewService] = useState({
        name: '',
        description: '',
        serviceTypeId: null,
        ticketTypes: ['']
    })
    const [serviceTypes, setServiceTypes] = useState({
        state: 'loading'
    })

    //fetch per tipologiche (endpoint da fare)

    //handlers change e submit
    function handleChange(key, value){
        setNewService({
            ...newService,
            [key]: value
        })
    }

    function onChangeTicketTypes(index, value){
        const updatedArray = [...newService.ticketTypes]
        updatedArray[index] = value

        setNewService({
            ...newService,
            ticketTypes: updatedArray
        })
    }


    function handleSubmit(){
        console.log('submit');

        const serviceToSend = {...newService}

        //fetch
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/services/store`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(serviceToSend)
        })
        .then(res => res.json())
        .then(data => {
            throwMessage('success', data)
        })
        .catch(err =>{
            throwMessage('error', err.message)
        })
        
    }

    return(
        <>
        <div className="container p-5">
            <h1>Create a new service</h1>
            <p>Here you can define the basic details of your service, later you will be able to configure it</p>
            <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Service Name</span>
                    <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">With textarea</span>
                    <textarea class="form-control" aria-label="With textarea"></textarea>
                </div>

                <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupSelect01">Service Type</label>
                    <select class="form-select" id="inputGroupSelect01">
                        <option selected>Choose...</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
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
                                    <input value={item} name={`newService.ticketTypes[${i}]`} onChange={(e) => onChangeTicketTypes(i, e.target.value)} type="text" class="form-control" placeholder="Ticket Type" aria-label="Username" aria-describedby="basic-addon1"/>
                                </div>

                                <div className="d-flex aling-items-center justify-content-center gap-3">
                                    <button type="button" className="btn btn-primary"><i class="bi bi-file-plus"></i></button>
                                    <button type="button" className="btn btn-danger"><i class="bi bi-file-x"></i></button>
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