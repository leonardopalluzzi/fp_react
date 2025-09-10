import { useState, useEffect } from "react"
import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"
import LoaderUi from '../../../Components/dumb/Loader.ui'
import { useNavigate } from "react-router-dom"
import CreateServiceFormBasicUi from "../../../Components/dumb/CreateServiceFormBasic.ui"
import { Status } from "../../../Js/ServiceStatus"
import Error from "../../../Components/dumb/Error"

export default function AdminCreateService() {
    const { throwMessage } = useMessageContext()
    const { currentUser } = useAuthContext()
    const token = currentUser.token
    const navigate = useNavigate()

    const [newService, setNewService] = useState({
        name: '',
        description: '',
        serviceTypeId: 0,
        ticketTypes: [
            { name: '' }
        ],
        status: Status.INACTIVE
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



    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/tipologies/getAllServiceTypes`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.state && data.state == 'success') {
                    setServiceTypes({
                        state: 'success',
                        result: data.result
                    })
                } else if (data.state) {
                    throwMessage(data.state, [data.message])
                } else {
                    throwMessage('error', ['Unknown Error'])
                }
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
                'Content-type': 'application/json'
            },
            body: JSON.stringify(serviceToSend)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.state && data.state == 'success') {
                    throwMessage('success', ['Service added Correctly'])
                    return navigate(`/admin/service/${data.result.id}`)
                } else if (data.state) {
                    throwMessage(data.state, [data.message])
                } else {
                    throwMessage('error', ['Unknown Error'])
                }
            })
            .catch(err => {
                console.error(err);

                throwMessage('error', [err.message])
            })
            .finally(() => {
                setNewService({
                    name: '',
                    description: '',
                    serviceTypeId: 0,
                    ticketTypes: [{ name: '' }]
                })

            })

    }

    function deleteTTtype(index) {
        const updatedArray = newService.ticketTypes
        updatedArray.length == 1 ? throwMessage('error', ['You must insert at least one ticket type']) : updatedArray.splice(index, 1)
        setNewService({
            ...newService,
            ticketTypes: updatedArray
        })
    }

    function addTTtype() {
        const updatedArray = newService.ticketTypes
        updatedArray.length == 4 ? throwMessage('error', ['You can insert a maximum of 4 tycket types']) : updatedArray.push({ name: '' })
        setNewService({
            ...newService,
            ticketTypes: updatedArray
        })

    }

    function handleTTchange(index, value) {
        const updatedArray = [...newService.ticketTypes]
        updatedArray[index].name = value

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
                    <Error message={serviceTypes.message} />
                </>
            )
        case 'success':
            return (
                <>
                    <div className="container my-5">
                        <h1>Create a new service</h1>
                        <p>Here you can define the basic details of your service, later you will be able to configure it</p>
                    </div>
                    <CreateServiceFormBasicUi
                        onchange={handleChange}
                        onsubmit={handleSubmit}
                        onTTadd={addTTtype}
                        onTTdelete={deleteTTtype}
                        onTTchange={handleTTchange}
                        service={newService}
                        serviceTypeList={serviceTypes.result}
                        disableStatusSelect={true}
                    />
                </>
            )
    }
}