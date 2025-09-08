import { useEffect, useState } from "react"
import LoaderUi from "../../Components/dumb/Loader.ui"
import { useMessageContext } from "../../Contexts/MessageContext"
import { useAuthContext } from "../../Contexts/AuthContext"

import DashBoard from "../../Components/smart/DashBoard";
import { Role } from "../../Js/Roles";
import Error from "../../Components/dumb/Error";

export default function AdminDashboard() {

    const { currentUser } = useAuthContext()
    const { throwMessage } = useMessageContext()

    const [stats, setStats] = useState({
        state: 'loading',
        servicesData: [
            { name: 'No Data', value: 1, fill: '#000000ff' }
        ],
        ticketsData: [
            { name: 'No Data', value: 1, fill: '#000000ff' }
        ],
        usersData: [
            { name: 'No Data', value: 1, fill: '#000000ff' }
        ]
    })


    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/stats/company`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${currentUser.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                setStats({
                    state: 'success',
                    servicesData: [
                        { name: 'Active Services', value: data.activeServices, fill: '#00C49F' },
                        { name: 'Inactive Services', value: data.allServices - data.activeServices, fill: '#af1919ff' }
                    ],
                    ticketsData: [
                        { name: 'Open Tickets', value: data.openTickets, fill: '#00C49F' },
                        { name: 'Pending Tickets', value: data.pendingTickets, fill: '#ddc702ff' }
                    ],
                    usersData: [
                        { name: 'Customers Number', value: data.customerNumber, fill: '#00C49F' },
                        { name: 'Employees Number', value: data.employeeNumber, fill: '#00a6ffff' }
                    ]
                })
                if (data.state && data.state == "expired") {
                    throwMessage('expired', [data.error])

                } else if (data.error) {
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
                <Error message={stats.message} />
            )
        case 'success':
            return (
                <>

                    <DashBoard
                        servicesData={stats.servicesData}
                        ticketsData={stats.ticketsData}
                        usersData={stats.usersData}
                        role={Role.ADMIN}
                    />
                </>
            )
    }
}