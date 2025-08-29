export default function CreateServiceFormBasicUi({ onchange, onsubmit, onTTadd, onTTdelete, onTTchange, service, serviceTypeList }) {
    return (
        <>
            <div className="container p-5">
                <h1>Create a new service</h1>
                <p>Here you can define the basic details of your service, later you will be able to configure it</p>
                <form onSubmit={(e) => { e.preventDefault(); onsubmit() }}>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Service Name</span>
                        <input value={service.name} name="name" onChange={(e) => onchange(e.target.name, e.target.value)} type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" required />
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text">With textarea</span>
                        <textarea value={service.description} name="description" onChange={(e) => onchange(e.target.name, e.target.value)} class="form-control" aria-label="With textarea" placeholder="Description" required></textarea>
                    </div>

                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Service Type</label>
                        <select value={service.serviceTypeId} name="serviceTypeId" onChange={(e) => onchange(e.target.name, e.target.value)} class="form-select" id="inputGroupSelect01" required>
                            <option selected>Choose...</option>
                            {
                                serviceTypeList.result.map((item, i) => (
                                    <>
                                        <option value={item.id}>{item.name}</option>

                                    </>
                                ))
                            }
                        </select>
                    </div>

                    <div className="bg-white rounded rounded-3 p-3">
                        <h5>Add Ticket Types</h5>
                        {
                            service.ticketTypes.map((item, i) => (
                                <>
                                    <div key={i}>
                                        <div class="input-group my-3">
                                            <span class="input-group-text" id="basic-addon1">Ticket Type</span>
                                            <input value={item} name={`service.ticketTypes[${i}]`} onChange={(e) => onTTchange(i, e.target.value)} type="text" class="form-control" placeholder="Ticket Type" aria-label="Username" aria-describedby="basic-addon1" required />
                                        </div>

                                        <div className="d-flex aling-items-center justify-content-center gap-3">
                                            {
                                                i == service.ticketTypes.length - 1 && <button onClick={() => onTTadd()} type="button" className="btn btn-primary"><i class="bi bi-file-plus"></i></button>
                                            }

                                            <button onClick={() => onTTdelete(i)} type="button" className="btn btn-danger"><i class="bi bi-file-x"></i></button>
                                        </div>
                                    </div>

                                </>
                            ))
                        }

                    </div>

                    <div className="d-flex">
                        <button type="submit" className="btn btn-outline-success my-5 w-100">Save</button>
                    </div>
                </form>

            </div>
        </>
    )
}