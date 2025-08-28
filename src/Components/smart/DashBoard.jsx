import {  useState } from "react"
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import DashboardLayouts from "../../Js/DashboardLayouts";
import { Role } from "../../Js/Roles";
import RadialGraphUi from "../dumb/RadialGraph.ui";
import LinearGraphUi from "../dumb/LinearGraph.ui";
import PieGraphUi from "../dumb/PieGraph.ui";

const ResponsiveGridLayout = WidthProvider(Responsive);
const {adminLayouts, customerLayouts, employeeLayouts} = DashboardLayouts


export default function DashBoard({ servicesData, ticketsData, usersData, role }){

    const prefix = role == Role.ADMIN ? 'admin' : role == Role.EMPLOYEE ? 'employee' : role == Role.CUSTOMER ? 'customer' : role == Role.SUPERADMIN ? 'admin' : ''

    const [layouts, setLayouts] = useState(role == Role.ADMIN ? adminLayouts() : 
    role == Role.EMPLOYEE ? employeeLayouts() : 
    role == Role.CUSTOMER ? customerLayouts() : 
    role == Role.SUPERADMIN ? adminLayouts() : null )

    const [refreshkey, setRefreshkey] = useState(0)

    function resetLayout() {
        setLayouts(DashboardLayouts())
        setRefreshkey(k => k + 1)
    }

    return(
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
                                    <PieGraphUi data={servicesData} action={`/${prefix}/services`}/>
    
                                </div>
    
    
                                {/* grafico tickets  */}
                                <div key="tickets" className="bg-white shadow rounded p-3">
                                    <h3>Tickets Statistics</h3>
                                    <LinearGraphUi data={ticketsData} action={`/${prefix}/tickets`}/>
                                </div>
   
                                {/* users stats  */}
                                <div key="users" className="bg-white shadow rounded p-3">
                                    <h3>Employees / Customers Statistics</h3>
                                    <RadialGraphUi data={usersData} action={`/${prefix}/users`}/> 
                                </div>    
                            </ResponsiveGridLayout >
                        </div >
    </>
    )
}