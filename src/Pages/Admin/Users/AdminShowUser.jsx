import { useMessageContext } from "../../../Contexts/MessageContext"
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import LoaderUi from "../../../Components/dumb/Loader.ui"

export default function AdminShowUser() {
    const { throwMessage } = useMessageContext()
    const { currentUser } = useAuthContext()
    const { id } = useParams()
    const token = currentUser.token


    const [user, setUser] = useState({
        state: 'loading'
    })


    useEffect(() => {
        handleFetch()
    }, [])

    function handleFetch() {
        fetch(`${import.meta.env.VITE_BAKC_URL}/api/v1/users/${id}`, {
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
                    throwMessage('success', ['User deleted'])
                    setUser({
                        state: 'success',
                        result: data
                    })
                }

            }
            )
            .catch(err => {
                setUser({
                    state: 'error',
                    message: err.mess
                })
                throwMessage('error', [err.message])
            })
    }


    switch (user.state) {
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
                    show per impiegati azienda
                </>
            )
    }
}