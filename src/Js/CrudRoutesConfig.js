export const crudRoutesConfig = {
    admin: {
        serviceShow: id => `/admin/service/${id}`,
        serviceEdit: id => `/admin/service/edit/${id}`,
        usershow: id => `/admin/users/${id}`,
        userEdit: id => `/admin/users/edit/${id}`,
        ticketShow: id => `/admin/ticket/${id}`,
        ticketEdit: id => `/admin/ticket/edit/${id}`
    },
    employee: {
        serviceShow: id => `/employee/service/${id}`,
        usershow: id => `/employee/users/${id}`,
        userEdit: id => `/employee/users/edit/${id}`,
        ticketShow: id => `/employee/ticket/${id}`,
        ticketEdit: id => `/employee/ticket/edit/${id}`
    },
    customer: {
        serviceShow: id => `/customer/service/${id}`,
        usershow: id => `/customer/users/${id}`,
        userEdit: id => `/customer/users/edit/${id}`,
        ticketShow: id => `/customer/ticket/${id}`,
        ticketEdit: id => `/customer/ticket/edit/${id}`
    }
}