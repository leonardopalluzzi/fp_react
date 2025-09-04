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

// aggiungere tipologiche


export { assignOperatorToService, deleteOperatorFromService, registerCustomerToService, deleteCustomerFromService }