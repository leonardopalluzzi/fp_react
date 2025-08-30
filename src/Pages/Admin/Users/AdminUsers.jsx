import ShowServiceAdminListUi from "../../../Components/dumb/ShowServiceAdminLists.ui"
import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useState, useEffect } from "react"
import LoaderUi from "../../../Components/dumb/Loader.ui"
import UsersGenericListUi from "../../../Components/dumb/UsersGenericList.ui"


export default function AdminUsers() {
    const { throwMessage } = useMessageContext()
    const { currentUser } = useAuthContext()
    const token = currentUser.token

    const [users, setUsers] = useState({
        state: 'loading'
    })

    const [page, setPage] = useState(0)


    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/users?page=${page}`, {
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
                    setUsers({
                        state: 'success',
                        customers: data.customers,
                        operators: data.employees,
                        companyAdmins: data.companyAdmins,
                    })
                }
            })
            .catch(err => {
                setUsers({
                    state: 'error',
                    message: err.message
                })
                throwMessage('error', [err.message])
            })

    }, [])


    function handleOperatorShow(uId) {

    }

    function handleOperatorEdit(uId) {

    }

    function handleOperatorDelete(uId) {

    }



    //fetch dati
    switch (users.state) {
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
                        <h1>Employees / Customers /Admins</h1>
                        <p>Here you can have an overview of all the people connected to your services</p>
                        <ShowServiceAdminListUi
                            customers={users.customers.content}
                            operators={users.operators.content}
                            handleOperatorShow={handleOperatorShow}
                            handleOperatorEdit={handleOperatorEdit}
                            handleOperatorDelete={handleOperatorDelete}
                        />


                        {/* tabella admin  */}
                        <UsersGenericListUi
                            users={users.companyAdmins}
                            title={'Company Admins'}
                            ondelete={handleOperatorDelete}
                            onedit={handleOperatorEdit}
                            onshow={handleOperatorShow}
                        />

                    </div>
                </>
            )
    }
}