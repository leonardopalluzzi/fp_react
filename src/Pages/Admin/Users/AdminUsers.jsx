import ShowServiceAdminListUi from "../../../Components/dumb/ShowServiceAdminLists.ui"
import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useState, useEffect } from "react"
import LoaderUi from "../../../Components/dumb/Loader.ui"
import UsersGenericListUi from "../../../Components/dumb/UsersGenericList.ui"
import { useNavigate } from "react-router-dom"


export default function AdminUsers() {
    const { throwMessage } = useMessageContext()
    const { currentUser } = useAuthContext()
    const token = currentUser.token
    const navigate = useNavigate();

    //state e variabili per fetch
    //----------
    const [operators, setOperators] = useState({
        state: 'loading'
    })

    const [customers, setCustomers] = useState({
        state: 'loading'
    })

    const [admins, setAdmins] = useState({
        state: 'loading'
    })

    const [fetchState, setFetchState] = useState('loading')
    //------------------



    // config per wrapper paginazione e filtri
    //------------------
    const [operatorsPage, setOperatorsPage] = useState(0)
    const [customersPage, setCustomersPage] = useState(0)

    const [operatorsFilters, setOperatorsFilters] = useState({})
    const [customersFilters, setCustomersFilters] = useState({})


    const config = {
        operatorsConfig: {
            page: operatorsPage,
            setPage: setOperatorsPage,
            filters: operatorsFilters,
            setFilters: setOperatorsFilters,
            fields: [
                { key: "username", label: "Username", type: "text" }
            ],
            pageNumber: 0

        },
        customersConfig: {
            page: customersPage,
            setPage: setCustomersPage,
            filters: customersFilters,
            setFilters: setCustomersFilters,
            fields: [
                { key: "username", label: "Username", type: "text" }
            ],
            pageNumber: 0
        }
    }

    function buildQuery(filters) {
        let query = ''

        for (const key in filters) {
            if (filters[key] != undefined && filters[key] != '') {
                query += `&${key}=${filters[key]}`
            }
        }

        return query
    }
    //------------------



    //seprare i 3 fetch per operators, customers e admins, lato back è gia settato
    useEffect(() => {
        handleFetch('operators', setOperators, operatorsPage, buildQuery(operatorsFilters))
    }, [operatorsFilters])

    useEffect(() => {
        handleFetch('customers', setCustomers, customersPage, buildQuery(customersFilters))
    }, [customersFilters])

    useEffect(() => {
        handleFetch('admins', setAdmins, 0, '')
    }, [])

    //state per controllo rendering
    useEffect(() => {
        if (operators.state == 'success' && customers.state == 'success' && admins.state == 'success') {
            setFetchState("success")
        } else if (operators.state == 'error' || customers.state == 'error' || admins.state == 'error') {
            setFetchState("error")
        }
    }, [operators, customers, admins])



    function handleFetch(listType, setter, page, query) {
        console.log(query);

        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/users?list=${listType}&page=${page}${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.state && (data.state == 'error' || data.state == 'expired')) {
                    throwMessage(`${data.state} on ${listType}`, [data.message])
                    return;
                } else {
                    setter({
                        state: 'success',
                        result: data.content,
                        pagination: data
                    })
                }
            })
            .catch(err => {
                setter({
                    state: 'error',
                    message: err.message
                })
                throwMessage(`error`, [`error on ${listType}`, err.message])
            })
    }


    function handleOperatorShow(uId) {
        return navigate(`/admin/user/${uId}`)
    }

    function handleOperatorEdit(uId) {
        return navigate(`/admin/user/edit/${uId}`)
    }

    function handleOperatorDelete(uId) {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/users/delete/${uId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.state && (data.state == 'error' || data.state == 'expired')) {
                    throwMessage(data.state, [data.message])
                } else {
                    throwMessage('success', ['User deleted'])
                    handleFetch()
                }
            })
            .catch(err => {
                throwMessage('error', [err.message])
            })
    }

    switch (fetchState) {
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

            config.operatorsConfig.pageNumber = operators.result.totalpages
            config.customersConfig.pageNumber = customers.result.totalpages

            return (
                <>
                    <div className="container my-5">
                        <h1>Employees / Customers /Admins</h1>
                        <p>Here you can have an overview of all the people connected to your services</p>
                        <ShowServiceAdminListUi
                            customers={customers.result}
                            operators={operators.result}
                            handleOperatorShow={handleOperatorShow}
                            handleOperatorEdit={handleOperatorEdit}
                            handleOperatorDelete={handleOperatorDelete}
                            wrapperConfig={config}
                        />


                        {/* tabella admin  */}
                        <UsersGenericListUi
                            users={admins.result}
                            title={'Company Admins'}
                            ondelete={handleOperatorDelete}
                            onedit={handleOperatorEdit}
                            onshow={handleOperatorShow}
                            disableEdit={true}
                            disableShow={false}
                            disableDelete={true}
                        />

                    </div>
                </>
            )
    }
}