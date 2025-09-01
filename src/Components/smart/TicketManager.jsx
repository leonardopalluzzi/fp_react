import { useMessageContext } from "../../Contexts/MessageContext"
import { useState, useEffect } from "react"
import LoaderUi from "../dumb/Loader.ui"

export default function TicketManager({ currentUser, serviceId, ticketId }) {
    //logica con funzioni handle per interagire con i ticket come riassegnazioni ecc..
    const { throwMessage } = useMessageContext()
    const token = currentUser.token

    const [operators, setOperators] = useState({
        state: 'loading'
    })

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


    function assignTicketToOperator(ticketId, operatorId) {
        //endpoint apposito creato in back
    }


    switch (operators.state) {
        case 'loading':
            return <LoaderUi />
        case 'error':
            return (
                <>
                    <p>{operators.message}</p>
                </>
            )
        case 'success':
            return (
                <>
                <div className="card border-0 shadow p-4">
                    <h3>ticket manager</h3>
                    {/* componenti ui per la gestione, renderizzabili in base al ruolo  */}
                    <div>
                        admin: riassegna ticket, cambia stato ticket, update ticket, aggiungi note (storico)
                        impiegato: riassegna ticket, cambia stato ticket, aggiungi note
                        cliente: aggiungi note

                        <ul>
                            <li>riassegna tt</li>
                            <li>update storico (cambia stato inserisci note)</li>
                            <li>tasto per pagina di edit</li>
                        </ul>
                    </div>
                </div>
                    
                </>
            )
    }
}