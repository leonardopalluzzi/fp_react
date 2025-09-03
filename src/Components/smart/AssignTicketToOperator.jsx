import { useMessageContext } from "../../Contexts/MessageContext"
import { useState, useEffect } from "react"
import LoaderMiniUi from "../dumb/LoaderMini.ui"
import { useFiltersContext } from "../../Contexts/FiltersContext"

export default function AssignTIcketToOperator({ currentUser, serviceId, ticketId, currentAssignee }) {
    const { throwMessage, setLoader } = useMessageContext()
    const token = currentUser.token
    const { handleRefresh } = useFiltersContext()

    const [operators, setOperators] = useState({
        state: 'loading'
    })

    const [operatorId, setOperatorId] = useState(currentAssignee)

    //recupero lista di operatori per servizio dalla index, a partire dal ticket id

    // nella back ho fatto le specification per users per hasService e hasRole, e sono gia integrate, ma alla fine ho fatto endpoin dedicato con metodo getoperatorbyservice
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/users/manage/${serviceId}`, { //ricorsione infinita lato back
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.state && (data.state == 'error' || data.state == 'expired')) {
                    throwMessage(data.state, [data.message])
                } else {
                    setOperators({
                        state: 'success',
                        result: data
                    })
                }
            })
            .catch(err => {
                throwMessage('error', [err.message])
                setOperators({
                    state: 'error',
                    message: err.message
                })
            })
    }, [])


    function handleSubmit() {
        setLoader(true)
        const url = operatorId == null ? `${import.meta.env.VITE_BACK_URL}/api/v1/tickets/manage/assign/ticket/${ticketId}` : `${import.meta.env.VITE_BACK_URL}/api/v1/tickets/manage/assign/ticket/${ticketId}?operatorId=${operatorId}`;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.state && (data.state == 'error' || data.state == 'expired')) {
                    throwMessage(data.state, [data.message])
                } else {
                    throwMessage('success', ['Ticket assigned correctly'])
                }
            })
            .catch(err => {
                throwMessage('error', [err.message])
            })
            .finally(() => {
                setLoader(false)
                handleRefresh()
            })
    }

    function handleChange(value) {
        const operatorValue = value == "" ? null : value
        setOperatorId(operatorValue)
    }


    switch (operators.state) {
        case 'loading':
            return <LoaderMiniUi />
        case 'error':
            return (
                <>
                    <p>{operators.message}</p>
                </>
            )
        case 'success':
            return (
                <>
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} action="">
                        <div class="input-group mb-3">
                            <button type="submit" class="btn btn-outline-success">Assign</button>
                            <select value={operatorId} onChange={(e) => handleChange(e.target.value)} class="form-select" id="inputGroupSelect03" aria-label="Example select with button addon">
                                <option value="">None</option>
                                {
                                    operators.result.map(item => (
                                        <>
                                            <option value={item.id}>{item.username}</option>
                                        </>
                                    ))
                                }
                            </select>
                        </div>
                    </form>
                </>
            )
    }
}