import AdminLayout from "../Layouts/AdminLayout";
import EmployeeLayout from "../Layouts/EmployeeLayout";
import CustomerLayout from "../Layouts/CustomerLayout";
import { Role } from "./Roles";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import EmployeeDashboard from "../Pages/Employee/EmployeeDashboard";
import CustomerDashboard from "../Pages/Customer/CustomerDashboard";
import Profile from "../Pages/Common/ShowProfile";
import IndexServices from '../Pages/Common/Services/IndexServices';
import ShowServicePage from "../Pages/Common/Services/ShowServicePage";
import AdminCreateService from '../Pages/Admin/Services/AdminCreateService'
import AdminEditService from "../Pages/Admin/Services/AdminEditService";
import IndexTickets from "../Pages/Common/Tickets/IndexTickets";
import ShowTicket from '../Pages/Common/Tickets/ShowTicket';
import AdminEditTicket from '../Pages/Admin/Tickets/AdminEditTicket';
import CreateTicket from "../Pages/Common/CreateTicket";
import TicketsPool from "../Pages/Common/Tickets/TicketsPool";
import AdminUsers from "../Pages/Admin/Users/AdminUsers";
import AdminShowUser from "../Pages/Admin/Users/AdminShowUser";
import AdminEditUser from "../Pages/Admin/Users/AdminEditUser";
import AdminCreateUser from "../Pages/Admin/Users/AdminCreateUser";
import EmployeeTickets from '../Pages/Employee/Tickets/EmployeeTickets';

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
                component: IndexServices,
                roles: [Role.ADMIN, Role.SUPERADMIN]
            },
            {
                path: 'service/:id',
                component: ShowServicePage,
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
                component: IndexTickets,
                roles: [Role.ADMIN, Role.SUPERADMIN]
            },
            {
                path: 'ticket/:id',
                component: ShowTicket,
                roles: [Role.ADMIN, Role.SUPERADMIN]
            },
            {
                path: 'ticket/edit/:ticketId/service/:serviceId',
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
                component: TicketsPool,
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
            },
            {
                path: 'user/create/:id',
                component: AdminCreateUser,
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
            },
            {
                path: 'services',
                component: IndexServices,
                roles: [Role.EMPLOYEE, Role.SUPERADMIN]
            },
            {
                path: 'service/:id',
                component: ShowServicePage,
                roles: [Role.EMPLOYEE, Role.SUPERADMIN]
            },
            // index tt
            {
                path: 'tickets',
                component: EmployeeTickets,
                roles: [Role.EMPLOYEE, Role.SUPERADMIN]
            },
            // tt pool
            {
                path: 'ticketspool',
                component: TicketsPool,
                roles: [Role.EMPLOYEE, Role.SUPERADMIN]
            },
            // show tt con create ecc...
            {
                path: 'ticket/:id',
                component: ShowTicket,
                roles: [Role.EMPLOYEE, Role.SUPERADMIN]
            },
            {
                path: 'ticket/create/:id',
                component: CreateTicket,
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
            },
            // tt index
            {
                path: 'tickets',
                component: IndexTickets,
                roles: [Role.CUSTOMER, Role.SUPERADMIN]
            },
            // tt show con create tt ecc...
            {
                path: 'ticket/:id',
                component: ShowTicket,
                roles: [Role.CUSTOMER, Role.SUPERADMIN]
            },
            // service index
            {
                path: 'services',
                component: IndexServices,
                roles: [Role.CUSTOMER, Role.SUPERADMIN]
            },
            // service show solo lettura
            {
                path: 'service/:id',
                component: ShowServicePage,
                roles: [Role.CUSTOMER, Role.SUPERADMIN]
            },
            {
                path: 'ticket/create/:id',
                component: CreateTicket,
                roles: [Role.CUSTOMER, Role.SUPERADMIN]
            }
        ]
    }
]