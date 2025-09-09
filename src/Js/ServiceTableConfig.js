export const serviceTableConfig = {
    admin: {
        columns: [
            { key: 'name', label: 'Name' },
            { key: 'serviceType.name', label: 'Service Type' },
            { key: 'code', label: 'Code' },
            { key: 'createdAt', label: 'Created At' },
            { key: 'status', label: 'Status' },
            { key: 'customers.length', label: 'N. of Customers' },
            { key: 'operators.length', label: 'N. of Operator' },
            { key: 'tickets.length', label: 'N. of Tickets' },
        ],
        actions: ['view', 'update', 'delete']
    },
    employee: {
        columns: [
            { key: 'name', label: 'Name' },
            { key: 'serviceType.name', label: 'Service Type' },
            { key: 'status', label: 'Status' },
            { key: 'tickets.length', label: 'N. of Tickets' },
        ],
        actions: ['view']
    },
    customer: {
        columns: [
            { key: 'name', label: 'Name' },
            { key: 'serviceType.name', label: 'Service Type' },
            { key: 'code', label: 'Code' },
            { key: 'status', label: 'Status' }
        ],
        actions: ['view', 'delete']

    }
}