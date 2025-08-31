import AdminLayout from "../Layouts/AdminLayout";
import EmployeeLayout from "../Layouts/EmployeeLayout";
import CustomerLayout from "../Layouts/CustomerLayout";
import { Role } from "./Roles";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import EmployeeDashboard from "../Pages/Employee/EmployeeDashboard";
import CustomerDashboard from "../Pages/Customer/CustomerDashboard";
import Profile from "../Pages/Common/ShowProfile";
import AdminServices from '../Pages/Admin/Services/AdminServices';
import AdminShowService from "../Pages/Admin/Services/AdminShowService";
import AdminCreateService from '../Pages/Admin/Services/AdminCreateService'
import AdminEditService from "../Pages/Admin/Services/AdminEditService";
import AdminTickets from "../Pages/Admin/Tickets/AdminTickets";
import AdminShowTicket from '../Pages/Admin/Tickets/AdminShowTicket';
import AdminEditTicket from '../Pages/Admin/Tickets/AdminEditTicket';
import CreateTicket from "../Pages/Common/CreateTicket";
import AdminTicketsPool from "../Pages/Admin/Tickets/AdminTicketsPool";
import AdminUsers from "../Pages/Admin/Users/AdminUsers";
import AdminShowUser from "../Pages/Admin/Users/AdminShowUser";
import AdminEditUser from "../Pages/Admin/Users/AdminEditUser";

export const routes = [
    {
        path: '/admin',
        layout: AdminLayout,
        roles: [Role.ADMIN, Role.SUPERADMIN],
        children: [
            {
                path: 'dashboard',
                component: AdminDashboard,
                roles: [Role.ADMIN, Role.SUPERADMIN]
            },
            {
                path: 'profile',
                component: Profile,
                roles: [Role.ADMIN, Role.SUPERADMIN]
            },
            {
                path: 'services',
                component: AdminServices,
                roles: [Role.ADMIN, Role.SUPERADMIN]
            },
            {
                path: 'service/:id',
                component: AdminShowService,
                roles: [Role.ADMIN, Role.SUPERADMIN]
            },
            {
                path: 'service/edit/:id',
                component: AdminEditService,
                roles: [Role.ADMIN, Role.SUPERADMIN]
            },
            {
                path: 'service/create',
                component: AdminCreateService,
                roles: [Role.ADMIN, Role.SUPERADMIN]
            },
            {
                path: 'tickets',
                component: AdminTickets,
                roles: [Role.ADMIN, Role.SUPERADMIN]
            },
            {
                path: 'ticket/:id',
                component: AdminShowTicket,
                roles: [Role.ADMIN, Role.SUPERADMIN]
            },
            {
                path: 'ticket/edit/:id',
                component: AdminEditTicket,
                roles: [Role.ADMIN, Role.SUPERADMIN]
            },
            {
                path: 'ticket/create/:id',
                component: CreateTicket,
                roles: [Role.ADMIN, Role.SUPERADMIN]
            },
            {
                path: 'ticketspool',
                component: AdminTicketsPool,
                roles: [Role.ADMIN, Role.SUPERADMIN]
            },
            {
                path: 'users',
                component: AdminUsers,
                roles: [Role.ADMIN, Role.SUPERADMIN]
            },
            {
                path: 'user/:id',
                component: AdminShowUser,
                roles: [Role.ADMIN, Role.SUPERADMIN]
            },
            {
                path: 'user/edit/:id',
                component: AdminEditUser,
                roles: [Role.ADMIN, Role.SUPERADMIN]
            }
        ]
    },
    {
        path: '/employee',
        layout: EmployeeLayout,
        roles: [Role.EMPLOYEE, Role.SUPERADMIN],
        children: [
            {
                path: 'dashboard',
                component: EmployeeDashboard,
                roles: [Role.EMPLOYEE, Role.SUPERADMIN]
            },
            {
                path: 'profile',
                component: Profile,
                roles: [Role.EMPLOYEE, Role.SUPERADMIN]
            }
        ]
    },
    {
        path: '/customer',
        layout: CustomerLayout,
        roles: [Role.CUSTOMER, Role.SUPERADMIN],
        children: [
            {
                path: 'dashboard',
                component: CustomerDashboard,
                roles: [Role.CUSTOMER, Role.SUPERADMIN]
            },
            {
                path: 'profile',
                component: Profile,
                roles: [Role.CUSTOMER, Role.SUPERADMIN]
            }
        ]
    }
]