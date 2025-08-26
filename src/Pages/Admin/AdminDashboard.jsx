import { useEffect, useState } from "react"
import LoaderUi from "../../Components/dumb/Loader.ui"
import { useMessageContext } from "../../Contexts/MessageContext"
import { useAuthContext } from "../../Contexts/AuthContext"


export default function AdminDashboard() {

    const { currentUser } = useAuthContext()
    const { throwMessage } = useMessageContext()

    const [stats, setStats] = useState({
        state: 'loading'
    })

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/stats/company`, {
            methodt: 'GET',
            headers: {
                'Authorization': `Bearer ${currentUser.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                setStats({
                    state: 'success',
                    result: data
                })
                if (data.error) {
                    throwMessage('error', [JSON.stringify(data)])
                }
            })
            .catch(err => {
                setStats({
                    state: 'error',
                    message: err.message
                })
                throwMessage('error', [err.message])
            })

    }, [])

    switch (stats.state) {
        case 'loading':
            return (
                <>
                    <LoaderUi />
                </>
            )
        case 'error':
            return (
                <div className="text-danger">
                    {stats.message}
                </div>
            )
        case 'success':
            return (
                <>
                    <div className="container py-5">
                        <h1>admin dashboard</h1>

                    </div>
                </>
            )
    }
}