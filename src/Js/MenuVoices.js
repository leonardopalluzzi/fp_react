import { Role } from "./Roles"

export const menuVoices = [
    {
        name: 'Services',
        path: '/services', // aggiungere il path in base al ruolo come prefisso
        roles: [Role.ADMIN, Role.CUSTOMER, Role.EMPLOYEE, Role.SUPERADMIN],
        style: ''

    },
    {
        name: 'Customers / Employees',
        path: '/users', // aggiungere il path in base al ruolo come prefisso
        roles: [Role.ADMIN, Role.SUPERADMIN],
        style: ''

    },
    {
        name: 'Tickets Pool',
        path: '/ticketspool', // aggiungere il path in base al ruolo come prefisso
        roles: [Role.EMPLOYEE, Role.SUPERADMIN],
        style: ''

    },
    {
        name: 'Company info',
        path: '/company', // aggiungere il path in base al ruolo come prefisso
        roles: [Role.ADMIN, Role.SUPERADMIN],
        style: ''

    },
    {
        name: 'Tickets',
        path: '/tickets', // aggiungere il path in base al ruolo come prefisso
        roles: [Role.ADMIN, Role.CUSTOMER, Role.EMPLOYEE, Role.SUPERADMIN],
        style: ''

    },
    {
        name: 'Logout',
        path: '/logout',
        roles: [Role.ADMIN, Role.CUSTOMER, Role.EMPLOYEE, Role.SUPERADMIN],
        style: 'btn btn-warning d-flex align-items-center justify-content-center my-5'
    }
]