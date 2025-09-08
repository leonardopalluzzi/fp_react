import CreateServiceFormBasicUi from "../../../Components/dumb/CreateServiceFormBasic.ui"
import LoaderUi from "../../../Components/dumb/Loader.ui"
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useMessageContext } from "../../../Contexts/MessageContext"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { updateService } from "../../../Js/FetchFunctions"
import { useFiltersContext } from "../../../Contexts/FiltersContext"
import Error from "../../../Components/dumb/Error"

export default function AdminEditService() {
    const { throwMessage, setLoader } = useMessageContext();
    const { currentUser, prefix } = useAuthContext();
    const { id } = useParams();
    const token = currentUser.token;
    const { refreshKey, handleRefresh } = useFiltersContext()

    const [service, setService] = useState({
        state: 'loading',
        result: {
            name: '',
            description: '',
            serviceTypeId: null,
            status: '',
            ticketTypes: [
                { id: null, name: '' }
            ],
        }
    })

    const serviceFetchUrl = `${import.meta.env.VITE_BACK_URL}/api/v1/services/${id}`
    const servciceTypeListFetchUrl = `${import.meta.env.VITE_BACK_URL}/api/v1/tipologies/servicetypes`
    const options =
    {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [res1, res2] = await Promise.all([
                    fetch(serviceFetchUrl, options),
                    fetch(servciceTypeListFetchUrl, options)
                ]);

                if (!res1.ok || !res2.ok) {
                    if (res1.status == 401 || res2.status == 401) {
                        throw new Error('expired');
                    }
                    throw new Error(`${res1.status}, ${res2.status}`);
                }

                const [service, typeList] = await Promise.all([
                    res1.json(),
                    res2.json()
                ])
                console.log(typeList);
                console.log(service);



                if ((service.state && service.state == 'success') && (typeList.state && typeList.state == 'success')) {
                    setService({
                        state: "success",
                        result: {
                            name: service.result.name,
                            description: service.result.description,
                            serviceTypeId: service.result.serviceType.id,
                            status: service.result.status,
                            ticketTypes: service.result.ticketTypes.length > 0 ? service.result.ticketTypes : [
                                { id: null, name: '' }
                            ],
                        },
                        serviceTypeList: typeList.result
                    });
                } else if (service.state && typeList.state) {
                    setLoader(false)
                    throwMessage(service.state || typeList.state, [service.message || typeList.message])
                } else {
                    setLoader(false)
                    throwMessage('error', ['Unknown Error'])
                }

            } catch (err) {
                console.error(err)
                setService({
                    state: 'error',
                    message: err.message
                })
                if (err.message === "expired") {
                    throwMessage("expired", "token expired");
                } else {
                    throwMessage("error", [err.message]);
                }
            }
        }

        fetchData();
    }, [refreshKey])

    //get tipologiche service
    useEffect(() => {

    })


    //handle per form edit basic details
    function handleDetailsChange(key, value) {
        setService({
            ...service,
            result: {
                ...service.result,
                [key]: value
            }
        })

    }

    function handleDetailsSubmit() {
        const payload = { ...service.result }
        updateService(id, payload, token, setLoader, throwMessage, handleRefresh, setService)
    }

    function deleteTTtype(index) {
        const updatedArray = service.result.ticketTypes
        updatedArray.length == 1 ? throwMessage('error', ['You must insert at least one ticket type']) : updatedArray.splice(index, 1)
        setService({
            ...service,
            result: {
                ...service.result,
                ticketTypes: updatedArray
            }
        })
    }

    function addTTtype() {
        const updatedArray = service.result.ticketTypes
        updatedArray.length == 4 ? throwMessage('error', ['You can insert a maximum of 4 tycket types']) : updatedArray.push({ name: '' })
        setService({
            ...service,
            result: {
                ...service.result,
                ticketTypes: updatedArray
            }
        })

    }

    function handleTTchange(index, value) {
        const updatedArray = [...service.result.ticketTypes]
        updatedArray[index].name = value

        setService({
            ...service,
            result: {
                ...service.result,
                ticketTypes: updatedArray
            }
        })
    }

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
                    <Error message={service.message} />
                </>
            )
        case 'success':
            return (
                <>

                    <div className="container my-5">
                        <h1>Edit Service</h1>
                        <p>Here you can edit your service basic details</p>
                        <CreateServiceFormBasicUi
                            service={service.result}
                            onchange={handleDetailsChange}
                            onsubmit={handleDetailsSubmit}
                            onTTadd={addTTtype}
                            onTTchange={handleTTchange}
                            onTTdelete={deleteTTtype}
                            serviceTypeList={service.serviceTypeList}
                            disableStatusSelect={false}
                        />
                    </div>
                </>
            )
    }
}