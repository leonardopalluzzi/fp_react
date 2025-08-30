import CreateServiceFormBasicUi from "../../../Components/dumb/CreateServiceFormBasic.ui"
import LoaderUi from "../../../Components/dumb/Loader.ui"
import ShowServiceAdminLits from '../../../Components/dumb/ShowServiceAdminLists.ui'
import ShowServiceTicketLists from '../../../Components/dumb/ShowServiceTicketList.ui'
import { useAuthContext } from "../../../Contexts/AuthContext"
import { useMessageContext } from "../../../Contexts/MessageContext"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export default function AdminEditService() {
    const { throwMessage } = useMessageContext();
    const { currentUser } = useAuthContext();
    const { id } = useParams();
    const token = currentUser.token;

    const [service, setService] = useState({
        state: 'loading',
        result: {
            name: '',
            description: '',
            serviceTypeId: null,
            ticketTypes: [
                { name: '' }
            ],
            customers: [{
                username: ''
            }],
            operators: [],
            tickets: [],

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

                if ((service.state && service.state === "expired") ||
                    (typeList.state && typeList.state === "expired")) {
                    throwMessage("expired", [service.error || typeList.error]);
                } else if ((service.state && service.state === "error") ||
                    (typeList.state && typeList.state === "error")) {
                    throwMessage("error", [service.error || typeList.error]);
                } else {
                    console.log(typeList);

                    setService({
                        state: "success",
                        result: service,
                        serviceTypeList: typeList
                    });
                }

            } catch (err) {
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
    }, [])

    //get tipologiche service
    useEffect(() => {

    })


    //handle per form edit basic details
    function handleDetailsChange() {

    }

    function handleDetailsSubmit() {

    }

    function handleTTadd() {

    }

    function handleTTchange() {

    }

    function handleTTdelete() {

    }


    function handleOperatorShow() {

    }

    function handleOperatorDelete() {

    }

    function handleOperatorEdit() {

    }

    function handleTicketsDelete() {

    }

    function handleTicketShow() {

    }

    function handleTicketEdit() {

    }


    const fakeArr = [{
        id: 1, name: 'cacca'
    }]



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

                    <div className="container my-5">
                        <h1>Configure Service</h1>
                        <p>Here you can configure your service details</p>
                        <CreateServiceFormBasicUi
                            service={service.result}
                            onchange={handleDetailsChange}
                            onsubmit={handleDetailsSubmit}
                            onTTadd={handleTTadd}
                            onTTchange={handleTTchange}
                            onTTdelete={handleTTdelete}
                            serviceTypeList={service.serviceTypeList}
                            disableStatusSelect={false}
                        />
                        <ShowServiceAdminLits
                            customers={service.result.customers}
                            operators={service.result.operators}
                            handleOperatorDelete={handleOperatorDelete}
                            handleOperatorEdit={handleOperatorEdit}
                            handleOperatorShow={handleOperatorShow}
                        />
                        <ShowServiceTicketLists
                            tickets={service.result.tickets}
                            handleTicketEdit={handleTicketEdit}
                            handleTicketShow={handleTicketShow}
                            handleTicketsDelete={handleTicketsDelete}
                        />
                    </div>
                </>
            )
    }
}