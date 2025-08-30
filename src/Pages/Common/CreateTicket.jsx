import { useMessageContext } from "../../Contexts/MessageContext"
import { useAuthContext } from "../../Contexts/AuthContext"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import LoaderUi from "../../Components/dumb/Loader.ui"
import { useNavigate } from "react-router-dom"
import { Role } from "../../Js/Roles"
import CreatTicketFormUi from "../../Components/dumb/CreateTicketForm.ui"


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
                    <CreatTicketFormUi
                        ticket={newTicket}
                        onchange={handleChange}
                        onsubmit={handleSubmit}
                        typeList={serviceTypeList.result}
                    />
                </>
            )
    }
}