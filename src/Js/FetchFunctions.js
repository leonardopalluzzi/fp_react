const assignOperatorToService = async (token, serviceId, operatorId, setLoader, throwMessage) => {
    setLoader(true)
    try {
        const response = await fetch(`${meta.import.env.VITE_BACK_URL}/api/v1/services/manage/${serviceId}/operator/${operatorId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()

        return data

    } catch (err) {
        throwMessage('error', [err.message])
        return { state: 'error', message: err.message }
    } finally {
        setLoader(false)
    }

}

const deleteOperatorFromService = async (token, serviceId, operatorId, setLoader, throwMessage) => {
    setLoader(true)
    try {
        const response = await fetch(`${meta.import.env.VITE_BACK_URL}/api/v1/services/manage/${serviceId}/operator/${operatorId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()

        return data

    } catch (err) {
        throwMessage('error', [err.message])
        return { state: 'error', message: err.message }
    } finally {
        setLoader(false)
    }

}

const deleteCustomerFromService = async (token, serviceId, customerId, setLoader, throwMessage) => {
    setLoader(true)
    try {
        const response = await fetch(`${meta.import.env.VITE_BACK_URL}/api/v1/services/manage/${serviceId}/customer/${customerId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()

        return data

    } catch (err) {
        throwMessage('error', [err.message])
        return { state: 'error', message: err.message }
    } finally {
        setLoader(false)
    }

}

const registerCustomerToService = async (token, payload, setLoader, throwMessage) => {
    setLoader(true)
    try {
        const response = await fetch(`${meta.import.env.VITE_BACK_URL}/api/v1/services/manage/register`, {
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

        return data

    } catch (err) {
        throwMessage('error', [err.message])
        return { state: 'error', message: err.message }
    } finally {
        setLoader(false)
    }

}

// aggiungere tipologiche


export { assignOperatorToService, deleteOperatorFromService, registerCustomerToService, deleteCustomerFromService }