import { useState, useEffect } from "react"
import LoaderMiniUi from "../dumb/LoaderMini.ui"
import { useMessageContext } from "../../Contexts/MessageContext"
import { useFiltersContext } from "../../Contexts/FiltersContext"
import DataWrapper from "./DataWrapper"

export default function ModalServiceManager({ token, function: action, title, label, setDisplay, list, serviceId }) {
    const { throwMessage, setLoader } = useMessageContext()
    const { setFiltersConfig, buildQuery, refreshKey } = useFiltersContext()

    const [users, setUsers] = useState({
        state: 'loading'
    })

    // set filters config ---------
    const [page, setPage] = useState(0)
    const [filters, setFilters] = useState({})

    useEffect(() => {
        if (users.state == 'success') {

            const fields = [
                { key: 'username', label: 'Username', type: 'text' },
                { key: 'email', label: 'Email', type: 'text' }
            ]

            setFiltersConfig(1, page, users.pagination.totalPages, setPage, fields, filters, setFilters)
        }

    }, [users])
    // -------------



    // fetch lista utenti in base al bottone cliccato
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/users?list=${list}&page=${page}${buildQuery(filters)}`, {
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
                    setUsers({
                        state: 'success',
                        result: data.content,
                        pagination: data
                    })
                }
            })
            .catch(err => {
                throwMessage('error', [err.message])
                setUsers({
                    state: 'error',
                    message: err.message
                })
            })
            .finally(() => {
                setLoader(false)
            })
    }, [page, refreshKey])


    // richiamo funzione submit corretta con le props necessarie
    function handleSubmit(uId) {
        action(token, serviceId, uId, setLoader, throwMessage) // valorizzare props
    }

    switch (users.state) {
        case 'loading':
            return <LoaderMiniUi />
        case 'error':
            return (
                <>
                    <div className="container position-absolute">
                        <button onClick={() => setDisplay(false)}>close</button>
                        <h1>{users.message}</h1>
                    </div>
                </>
            )
        case 'success':
            return (
                <>

                    <div className="modal_container">
                        <button className="btn btn-outline-danger" onClick={() => setDisplay(false)}><i class="bi bi-x-square"></i></button>
                        <h1>{title}</h1>
                        <DataWrapper css={'row row-cols-2'} list={1}>
                            <div className="row row-cols-1">
                                {
                                    users.result.map(item => (
                                        <>
                                            <div onClick={() => handleSubmit(item.id)} className="col">
                                                {item.username} - {item.email}
                                            </div>
                                        </>
                                    ))
                                }

                            </div>
                        </DataWrapper>
                    </div>
                </>
            )
    }
}