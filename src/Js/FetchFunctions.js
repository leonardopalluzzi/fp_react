const assignOperatorToService = async (token, serviceId, operatorId, setLoader, throwMessage, handleRefresh) => {
    setLoader(true)
    try {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/services/manage/${serviceId}/operator/${operatorId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()
        throwMessage('success', ['Operator added to service correctly'])
        return data

    } catch (err) {
        throwMessage('error', [err.message])
        return { state: 'error', message: err.message }
    } finally {
        setLoader(false)
        handleRefresh()
    }

}

const deleteOperatorFromService = async (token, serviceId, operatorId, setLoader, throwMessage, handleRefresh) => {
    setLoader(true)
    try {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/services/manage/${serviceId}/operator/${operatorId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()
        throwMessage('success', ['Operator detached from service correctly'])
        return data

    } catch (err) {
        throwMessage('error', [err.message])
        return { state: 'error', message: err.message }
    } finally {
        setLoader(false)
        handleRefresh()
    }

}

const deleteCustomerFromService = async (token, serviceId, customerId, setLoader, throwMessage, handleRefresh) => {
    setLoader(true)
    try {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/services/manage/${serviceId}/customer/${customerId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()
        throwMessage('success', ['Customer detached from service correctly'])
        return data

    } catch (err) {
        throwMessage('error', [err.message])
        return { state: 'error', message: err.message }
    } finally {
        setLoader(false)
        handleRefresh()
    }

}

const registerCustomerToService = async (token, payload, setLoader, throwMessage, handleRefresh) => {
    setLoader(true)
    try {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/services/manage/register`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()
        throwMessage('success', ['Customer registered to service correctly'])
        return data

    } catch (err) {
        throwMessage('error', [err.message])
        return { state: 'error', message: err.message }
    } finally {
        setLoader(false)
        handleRefresh()
    }

}

//tickets

const deleteTicket = (tId, token, throwMessage, setLoader, handleRefresh) => {
    setLoader(true)
    fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/tickets/delete/${tId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.state && data.state == 'success') {
                throwMessage(data.state, ['Ticket deleted correctly'])
            } else if (data.state) {
                throwMessage(data.state, [data.message])
            } else {
                throwMessage('error', ['Unknown Error'])
            }
        })
        .catch(err => {
            throwMessage('error', [err.message])
        })
        .finally(() => {
            setLoader(false)
            handleRefresh()
        })
}

// service
const deleteService = (sId, token, setLoader, throwMessage, handleRefresh) => {
    setLoader(true)
    fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/services/delete/${sId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.state && data.state == 'success') {
                throwMessage(data.state, ['Service Deleted Correctly'])
            } else if (data.state) {
                throwMessage(data.state, [data.message])
            } else {
                throwMessage('error', ['Unknown Error'])
            }
        })
        .catch(err => {
            throwMessage('error', [err.message])
        })
        .finally(() => {
            setLoader(false)
            handleRefresh()
        })
}

const updateService = (sId, payload, token, setLoader, throwMessage, handleRefresh, setService) => {
    console.log(payload);

    setLoader(true)
    fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/services/update/${sId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            if (data.state && data.state == 'success') {
                throwMessage(data.state, ['Service updated correctly'])
                handleRefresh()
            } else if (data.state) {
                setLoader(false)
                throwMessage(data.state, [data.message])
                return
            } else {
                setLoader(false)
                throwMessage('error', ['Unknown Error'])
                return
            }
        })
        .catch(err => {
            console.error(err)
            setLoader(false)
            throwMessage('error', [err.message])
            setService({
                state: 'error',
                message: err.message
            })
        })
        .finally(() => {
            setLoader(false)
        })

}

// aggiungere tipologiche


export { assignOperatorToService, deleteOperatorFromService, registerCustomerToService, deleteCustomerFromService, deleteTicket, deleteService, updateService }