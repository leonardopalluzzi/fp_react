import { useMessageContext } from "../../Contexts/MessageContext"
import { useAuthContext } from "../../Contexts/AuthContext"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import LoaderUi from "../../Components/dumb/Loader.ui"
import { useNavigate } from "react-router-dom"
import { Role } from "../../Js/Roles"


export default function CreateTicket() {
    const { throwMessage } = useMessageContext()
    const { currentUser } = useAuthContext()
    const token = currentUser.token
    const { id } = useParams() // id servizio
    const navigate = useNavigate()

    const prefix = currentUser.details.roles.includes(Role.ADMIN) && 'admin' || currentUser.details.roles.includes(Role.SUPERADMIN) && 'admin' || currentUser.details.roles.includes(Role.EMPLOYEE) && 'employee' || currentUser.details.roles.includes(Role.CUSTOMER) && 'customer'

    const [newTicket, setNewTicket] = useState({
        title: '',
        attachment: '',
        typeId: 0,
        description: '',
        notes: ''
    })
    const [serviceTypeList, setServiceTypeList] = useState({
        state: 'loading'
    })

    //carico tipologiche
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/tipologies/tickettypes/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                setServiceTypeList({
                    state: 'success',
                    result: data
                })
            })
            .catch(err => {
                setServiceTypeList({
                    state: 'error',
                    message: err.message
                })
                throwMessage('error', [err.message])
            })
    }, [])


    function handleSubmit() {
        const ticketToSend = { ...newTicket }
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/tickets/store/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(ticketToSend)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.state && (data.state == 'error' || data.state == 'expired')) {
                    throwMessage(data.state, [data.message])
                } else {
                    throwMessage('success', ["Ticket Created Succesfully"])
                    return navigate(`/${prefix}/ticket/${data.id}`)
                }
            })
            .catch(err => [
                throwMessage('error', [err.message])
            ])
    }

    function handleChange(key, value) {
        setNewTicket({
            ...newTicket,
            [key]: value
        })
    }


    switch (serviceTypeList.state) {
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
                        <h1 className="my-5">Create ticket for service: service_name</h1>
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} >
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Title</span>
                                <input value={newTicket.title} name="title" onChange={(e) => handleChange(e.target.name, e.target.value)} type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>

                            <div class="input-group mb-3 d-none">
                                <label class="input-group-text" for="inputGroupFile01">Attachment</label>
                                <input value={newTicket.attachment} name="attachments" onChange={(e) => handleChange(e.target.name, e.target.value)} type="file" class="form-control" id="inputGroupFile01" />
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Description</span>
                                <textarea value={newTicket.description} name="description" onChange={(e) => handleChange(e.target.name, e.target.value)} class="form-control" aria-label="With textarea"></textarea>
                            </div>

                            <div class="input-group mb-3">
                                <label class="input-group-text" for="inputGroupSelect01">Ticket Type</label>
                                <select value={newTicket.typeId} name="typeId" onChange={(e) => handleChange(e.target.name, e.target.value)} class="form-select" id="inputGroupSelect01">
                                    <option selected>Choose...</option>
                                    {
                                        serviceTypeList.result.map((item, i) => (
                                            <>
                                                <option value={item.id}>{item.name}</option>
                                            </>
                                        ))
                                    }
                                </select>
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Notes</span>
                                <textarea value={newTicket.notes} name="notes" onChange={(e) => handleChange(e.target.name, e.target.value)} class="form-control" aria-label="With textarea"></textarea>
                            </div>

                            <div className="d-flex align-items-center justify-content-center">
                                <button className="btn btn-outline-success w-100">Create</button>
                            </div>

                        </form>
                    </div>

                </>
            )
    }
}