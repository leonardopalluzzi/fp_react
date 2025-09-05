import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import LoaderUi from "../../../Components/dumb/Loader.ui"
import CreateTicketFormUi from '../../../Components/dumb/CreateTicketForm.ui'

export default function AdminEditTicket() {
    const { throwMessage, setLoader } = useMessageContext()
    const { currentUser } = useAuthContext()
    const token = currentUser.token
    const { ticketId, serviceId } = useParams()
    const navigate = useNavigate()

    const [ticket, setTicket] = useState({
        state: 'loading',
        id: ticketId,
        attachment: [],
        title: '',
        description: '',
        typeId: '',
    })

    useEffect(() => {

        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const ticketUrl = `${import.meta.env.VITE_BACK_URL}/api/v1/tickets/${ticketId}`
        const typeListUrl = `${import.meta.env.VITE_BACK_URL}/api/v1/tipologies/tickettypes/${serviceId}`


        const fetchData = async () => {
            try {
                const [res1, res2] = await Promise.all([
                    fetch(ticketUrl, options),
                    fetch(typeListUrl, options)
                ])

                const [ticketData, typeListData] = await Promise.all([
                    res1.json(),
                    res2.json()
                ])

                if ((ticketData.state && (ticketData.state == 'error' || ticketData.state == 'expired')) || (typeListData.state && (typeListData.state == 'error' || typeListData.state == 'expired'))) {
                    throwMessage(ticketData || typeListData.state, [ticketData.message || typeListData.message])
                    return
                } else {
                    console.log(ticketData);

                    setTicket({
                        state: 'success',
                        title: ticketData.title,
                        description: ticketData.description,
                        typeId: ticketData.type.id,
                        typeList: typeListData
                    })
                }
            } catch (err) {
                throwMessage('error', [err.message])
                setTicket({
                    state: 'error',
                    message: err.message
                })
            }


        }
        fetchData()

    }, [])

    function handleChange(key, value) {
        setTicket({
            ...ticket,
            [key]: value
        })
    }

    function handleSubmit() {
        setLoader(true)
        const ticketToSend = {
            id: ticketId,
            attachment: [],
            title: ticket.title,
            description: ticket.description,
            typeId: ticket.typeId,

        }

        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/tickets/update`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(ticketToSend)
        })
            .then(res => res.json())
            .then(data => {
                if (data.state && (data.state == 'error' || data.state == 'expired')) {
                    throwMessage(data.state, [data.message])
                    return
                } else {
                    throwMessage('success', ['Ticket Updated Correctly'])
                    return navigate(`/admin/ticket/${ticketId}`)
                }
            })
            .catch(err => throwMessage('error', [err.message]))
            .finally(()=> setLoader(false))
    }


    switch (ticket.state) {
        case 'loading':
            return <LoaderUi />
        case 'error':
            return (
                <>
                </>
            )
        case 'success':
            return (
                <>
                    <div className="container">
                        <CreateTicketFormUi
                            ticket={ticket}
                            onchange={handleChange}
                            onsubmit={handleSubmit}
                            typeList={ticket.typeList}
                            showNotes={false}
                            actionName={'Save'}
                        />
                    </div>
                </>
            )
    }
}



