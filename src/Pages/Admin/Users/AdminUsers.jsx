import ShowServiceAdminListUi from "../../../Components/dumb/ShowServiceAdminLists.ui"
import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useState, useEffect } from "react"
import LoaderUi from "../../../Components/dumb/Loader.ui"
import UsersGenericListUi from "../../../Components/dumb/UsersGenericList.ui"
import { useNavigate } from "react-router-dom"
import { useFiltersContext } from "../../../Contexts/FiltersContext"
import { crudRoutesConfig } from "../../../Js/CrudRoutesConfig"
import { deleteUser } from "../../../Js/FetchFunctions"
import Error from "../../../Components/dumb/Error"


export default function AdminUsers() {
    const { throwMessage, setLoader } = useMessageContext()
    const { currentUser, prefix } = useAuthContext()
    const { setFiltersConfig, buildQuery, refreshKey, handleRefresh } = useFiltersContext()
    const token = currentUser.token
    const navigate = useNavigate();
    const routeConfig = crudRoutesConfig[prefix]

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

    //configurazioni per filtri
    useEffect(() => {
        if (fetchState == 'success') {

            const customersFields = [
                { key: 'username', label: 'Username', type: 'text' },
                { key: 'email', label: 'Email', type: 'text' },
            ];
            const operatorsFields = [
                { key: 'username', label: 'Username', type: 'text' },
                { key: 'email', label: 'Email', type: 'text' }
            ];


            setFiltersConfig(
                1,
                customersPage,
                customers.pagination.totalPages,
                setCustomersPage,
                customersFields,
                customersFilters,
                setCustomersFilters
            );

            setFiltersConfig(
                2,
                operatorsPage,
                operators.pagination.totalPages,
                setOperatorsPage,
                operatorsFields,
                operatorsFilters,
                setOperatorsFilters
            );
        }

    }, [fetchState, operatorsFilters, customersFilters]);
    //------------------

    useEffect(() => {
        handleFetch('operators', setOperators, operatorsPage, buildQuery(operatorsFilters))

    }, [refreshKey])

    useEffect(() => {
        handleFetch('customers', setCustomers, customersPage, buildQuery(customersFilters))
    }, [refreshKey])

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
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/users?list=${listType}&page=${page}${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                
                if (data.state && data.state == 'success') {
                    setter({
                        state: 'success',
                        result: data.result.content,
                        pagination: data.result
                    })
                } else if (data.state) {
                    throwMessage(data.state, [data.message])
                } else {
                    throwMessage('error', ['Unknwon Error'])
                }
            })
            .catch(err => {
                setter({
                    state: 'error',
                    message: err.message
                })
                throwMessage(`error`, [`error on ${listType}`, err.message])
            })
            .finally(() => {
                setLoader(false)
            })
    }


    function handleOperatorShow(uId) {
        return navigate(routeConfig.userShow(uId))
    }

    function handleOperatorEdit(uId) {
        return navigate(routeConfig.userEdit(uId))
    }

    function handleOperatorDelete(uId) {
        deleteUser(uId, token, throwMessage, setLoader, handleRefresh)
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
                    <Error message={'An error happend during fetch'} />
                </>
            )
        case 'success':
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