export const crudRoutesConfig = {
    admin: {
        serviceShow: id => `/admin/service/${id}`,
        serviceEdit: id => `/admin/service/edit/${id}`,
        usershow: id => `/admin/user/${id}`,
        userEdit: id => `/admin/user/edit/${id}`,
        ticketShow: id => `/admin/ticket/${id}`,
        ticketEdit: (tId, sId) => `/admin/ticket/edit/${tId}/service/${sId}`
    },
    employee: {
        serviceShow: id => `/employee/service/${id}`,
        usershow: id => `/employee/user/${id}`,
        userEdit: id => `/employee/user/edit/${id}`,
        ticketShow: id => `/employee/ticket/${id}`,
        ticketEdit: id => `/employee/ticket/edit/${id}`
    },
    customer: {
        serviceShow: id => `/customer/service/${id}`,
        usershow: id => `/customer/user/${id}`,
        userEdit: id => `/customer/user/edit/${id}`,
        ticketShow: id => `/customer/ticket/${id}`,
        ticketEdit: id => `/customer/ticket/edit/${id}`
    }
}