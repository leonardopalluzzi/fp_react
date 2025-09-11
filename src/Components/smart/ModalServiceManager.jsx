import { useState, useEffect } from "react"
import LoaderMiniUi from "../dumb/LoaderMini.ui"
import { useMessageContext } from "../../Contexts/MessageContext"
import { useFiltersContext } from "../../Contexts/FiltersContext"
import DataWrapper from "./DataWrapper"

export default function ModalServiceManager({ token, function: action, title, label, setDisplay, list, serviceId, endpoint }) {
    const { throwMessage, setLoader } = useMessageContext()
    const { setFiltersConfig, buildQuery, refreshKey, handleRefresh, onChangeRefreshKey } = useFiltersContext()

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

            setFiltersConfig(4, page, users.pagination.totalPages, setPage, fields, filters, setFilters)
        }

    }, [users, onChangeRefreshKey])
    // -------------



    // fetch lista utenti in base al bottone cliccato
    useEffect(() => {
        fetch(`${endpoint}page=${page}${buildQuery(filters)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.state && (data.state == 'error' || data.state == 'expired')) {
                    throwMessage(data.state, [data.message])
                } else if (data.state && data.state == 'success') {
                    setUsers({
                        state: 'success',
                        result: data.result.content,
                        pagination: data.result
                    })
                } else {
                    setLoader(false)
                    setDisplay(false)
                    throwMessage('error', ['Unknown error'])
                    return
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
        action(token, serviceId, uId, setLoader, throwMessage, handleRefresh) // valorizzare props
    }

    switch (users.state) {
        case 'loading':
            return (
                <>
                    <div className="modal_container">
                        <div className="bg-light p-4 rounded rounded-4">
                            < LoaderMiniUi />
                        </div>
                    </div>


                </>
            )
        case 'error':
            return (
                <>
                    <div className="modal_container">
                        <button onClick={() => setDisplay(false)}>close</button>
                        <h1>{users.message}</h1>
                    </div>
                </>
            )
        case 'success':
            return (
                <>
                    <div className="modal_container">
                        <div className="bg-light p-4 rounded rounded-4">
                            <div className="d-flex w-100 align-items-center justify-content-end">
                                <button className="btn btn-outline-danger" onClick={() => setDisplay(false)}><i class="bi bi-x-square"></i></button>
                            </div>

                            <h1 className="mb-5">{title}</h1>
                            <div className="container">
                                <DataWrapper css={'row row-cols-2'} id={4}>
                                    <div className="row row-cols-1 my-4">
                                        {
                                            users.result.length == 0 ? <h3>No Data -</h3> : users.result.map(item => (
                                                <>
                                                    <div onClick={() => handleSubmit(item.id)} className="col btn btn-outline-dark text-start my-1 p-2">
                                                        {item.username} - {item.email}
                                                    </div>
                                                </>
                                            ))
                                        }

                                    </div>
                                </DataWrapper>
                            </div>
                        </div>

                    </div>
                </>
            )
    }
}