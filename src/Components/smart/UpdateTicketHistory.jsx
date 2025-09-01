import { useState } from "react"
import { useMessageContext } from "../../Contexts/MessageContext"
import { Status } from '../../Js/TicketStatus'

export default function UpdateTicketHistory({ currentUser, ticketId, ticketStatus }) {
    console.log(ticketStatus);

    const { throwMessage } = useMessageContext()
    const token = currentUser.token

    const statusArray = []

    for (const key in Status) {
        statusArray.push(key)
    }

    const [historyUpdate, setHistoryUpdate] = useState({
        ticketId: Number(ticketId),
        notes: '',
        changedById: Number(currentUser.details.id),
        changedAt: new Date().toISOString(),
        status: ticketStatus
    })

    function handleChange(key, value) {
        setHistoryUpdate({
            ...historyUpdate,
            [key]: value
        })
    }

    function formatDateForSpring(date) {
        return date.toISOString().slice(0, 19);
    }

    function handleSubmit() {

        const updateToSend = {
            ...historyUpdate,
            changedAt: formatDateForSpring(new Date())
        }
        console.log("Dati inviati:", JSON.stringify(updateToSend, null, 2))


        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/tickets/manage/insert`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updateToSend)
        })
            .then(res => res.json())
            .then(data => {
                if (data.state && (data.state == 'error' || data.state == 'expired')) {
                    throwMessage(data.state, [data.message])
                    return;
                } else {
                    throwMessage('success', ['Update registered'])
                    setHistoryUpdate({
                        ticketId: Number(ticketId),
                        notes: '',
                        changedById: Number(currentUser.details.id),
                        changedAt: new Date().toISOString(),
                        status: ticketStatus
                    })
                }
            })
            .catch(err => {
                throwMessage('error', [err.message])
            })
    }

    return (
        <>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                <div class="input-group mb-3">
                    <div class="input-group my-4">
                        <span class="input-group-text">Notes</span>
                        <textarea value={historyUpdate.notes} name="notes" onChange={(e) => handleChange(e.target.name, e.target.value)} class="form-control" aria-label="With textarea"></textarea>
                    </div>


                    <label class="input-group-text" for="inputGroupSelect01">Status</label>
                    <select value={historyUpdate.status} name="status" onChange={(e) => handleChange(e.target.name, e.target.value)} class="form-select" id="inputGroupSelect01">
                        {
                            statusArray.map((item, i) => (
                                <>
                                    {
                                        <option key={i} value={item}>{item}</option>
                                    }
                                </>
                            ))
                        }
                    </select>
                </div>

                <div>
                    <button className="btn btn-outline-success w-100">Save</button>
                </div>
            </form>
        </>
    )
}