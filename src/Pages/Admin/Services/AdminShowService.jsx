import { useAuthContext } from "../../../Contexts/AuthContext"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMessageContext } from "../../../Contexts/MessageContext";
import LoaderUi from "../../../Components/dumb/Loader.ui";
import ShowService from "../../../Components/smart/ShowService";
import { useFiltersContext } from "../../../Contexts/FiltersContext";

export default function AdminShowService() {
    const { throwMessage } = useMessageContext();
    const { currentUser } = useAuthContext();
    const { id } = useParams();
    const token = currentUser.token;
    const { setFiltersConfig, refreshKey } = useFiltersContext()

    const [service, setService] = useState({
        state: 'loading'
    })

    //fetch dati
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/api/v1/services/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                setService({
                    state: 'success',
                    result: data
                })
                if (data.state == 'error') {
                    throwMessage('error', [data.error])
                } else if (data.state == 'expired') {
                    throwMessage(data.state, [data.error])
                }
            })
            .catch(err => {
                setService({
                    state: 'error',
                    message: err.message
                })
                throwMessage('error', [err.message])
            })
    }, [refreshKey])


    switch (service.state) {
        case 'loading':
            return (
                <>
                    <LoaderUi />
                </>
            )
        case 'error':
            return (
                <>
                </>
            )
        case 'success':
            return (
                <>

                    <ShowService roles={currentUser.details.roles} service={service.result} />
                </>
            )
    }
}