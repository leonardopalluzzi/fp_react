import { useEffect, useState } from "react"
import LoaderUi from "../../Components/dumb/Loader.ui"
import { useMessageContext } from "../../Contexts/MessageContext"
import { useAuthContext } from "../../Contexts/AuthContext"
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import DashboardLayouts from "../../Js/DashboardLayouts";
import { RadialBarChart, RadialBar, Legend, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";

const ResponsiveGridLayout = WidthProvider(Responsive);



export default function AdminDashboard() {

    const { currentUser } = useAuthContext()
    const { throwMessage } = useMessageContext()

    const [stats, setStats] = useState({
        state: 'loading',
        servicesData: [
            { name: 'No Data', value: 1, color: '#1b1b1bff' }
        ],
        ticketsData: [
            { name: 'No Data', value: 1, color: '#00C49F' }
        ],
        usersData: [
            { name: 'No Data', value: 1, color: '#00C49F' }
        ]
    })


    const [layouts, setLayouts] = useState(DashboardLayouts)
    const [refreshkey, setRefreshkey] = useState(0)


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
                        { name: 'Active Services', value: data.activeServices, color: '#00C49F' },
                        { name: 'Inactive Services', value: data.allServices - data.activeServices, color: '#af1919ff' }
                    ],
                    ticketsData: [
                        { name: 'Open Tickets', value: data.openTickets, color: '#00C49F' },
                        { name: 'Pending Tickets', value: data.pendingTickets, color: '#ddc702ff' }
                    ],
                    usersData: [
                        { name: 'Customers Number', value: data.customerNumber, color: '#00C49F' },
                        { name: 'Employees Number', value: data.employeeNumber, color: '#00C49F' }
                    ]
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

    function resetLayout() {
        setLayouts(DashboardLayouts())
        setRefreshkey(k => k + 1)
    }

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
                        <button className="btn btn-outline-dark " onClick={resetLayout}>Reset Layout</button>
                        <h1>admin dashboard</h1>
                        <ResponsiveGridLayout
                            key={refreshkey}
                            className="layout"
                            layouts={layouts}
                            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                            cols={{ lg: 12, md: 12, sm: 8, xs: 4, xxs: 2 }}
                            rowHeight={30}
                            margin={[15, 15]} // margini tra box
                            draggableCancel="button, .no-drag"
                            onLayoutChange={(_, allLayouts) => setLayouts(allLayouts)}
                        >

                            {/* grafico services  */}
                            <div
                                key="services"
                                className="bg-white shadow rounded p-4"
                            >
                                <h3>Services Statistics</h3>
                                <div className="container h-75 w-100">
                                    <ResponsiveContainer>
                                        <PieChart margin={{ top: 0, right: 20, bottom: 20, left: 20 }}>
                                            <Pie
                                                data={stats.servicesData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={120}
                                                label
                                            >
                                                {stats.servicesData.map((entry, index) => (
                                                    <Cell key={index} fill={stats.servicesData[index].color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                <Link to={'/admin/services'} className="btn btn-outline-dark no-drag">Details</Link>
                            </div>


                            {/* grafico tickets  */}
                            <div key="tickets" className="bg-white shadow rounded p-3">
                                <h3>Tickets Statistics</h3>
                                <div className="container h-75 w-100">
                                    <ResponsiveContainer>
                                        <BarChart data={stats.ticketsData}>
                                            <XAxis dataKey={'name'} />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey={'value'}>
                                                {
                                                    stats.ticketsData.map((item, i) => (
                                                        <Cell key={`cell-${i}`} fill={`${item.color}`} />
                                                    ))
                                                }
                                            </Bar>
                                        </BarChart>

                                    </ResponsiveContainer>
                                    <Link to={'/admin/tickets'} className="btn btn-outline-dark no-drag">Details</Link>
                                </div>
                            </div>

                            {/* users stats  */}
                            <div key="users" className="bg-white shadow rounded p-3">
                                <h3>Employees / Users Statistics</h3>
                                <div className="container h-75 w-100">
                                    <ResponsiveContainer>
                                        <RadialBarChart
                                            innerRadius="20%"
                                            outerRadius="90%"
                                            startAngle={180}
                                            endAngle={0}
                                            data={stats.usersData} // passa direttamente l'array completo
                                        >
                                            <RadialBar
                                                minAngle={15}
                                                background
                                                clockWise
                                                dataKey="value"
                                                nameKey="name"
                                                label={({ name, value }) => `${name}: ${value}`}

                                            >
                                                {stats.usersData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}

                                            </RadialBar>
                                            <Legend
                                                payload={stats.usersData.map((item, index) => ({
                                                    value: `${item.name}`,
                                                    type: "square",
                                                    id: item.name,
                                                    color: item.color
                                                }))}
                                            />

                                            <Tooltip formatter={(value, name, props) => [`${value}`, `${props.payload.name}`]} />
                                        </RadialBarChart>
                                    </ResponsiveContainer>
                                    <Link to={'/admin/users'} className="btn btn-outline-dark no-drag">Details</Link>


                                </div>
                            </div>
                        </ResponsiveGridLayout >



                    </div >
                </>
            )
    }
}