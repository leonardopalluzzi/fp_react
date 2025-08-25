import AdminLayout from "../Layouts/AdminLayout";
import EmployeeLayout from "../Layouts/EmployeeLayout";
import CustomerLayout from "../Layouts/CustomerLayout";
import { Role } from "./Roles";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import EmployeeDashboard from "../Pages/Employee/EmployeeDashboard";
import CustomerDashboard from "../Pages/Customer/CustomerDashboard";

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
            }
        ]
    }
]