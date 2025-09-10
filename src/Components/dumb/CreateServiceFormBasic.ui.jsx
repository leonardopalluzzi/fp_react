import { Status } from "../../Js/ServiceStatus";

export default function CreateServiceFormBasicUi({ onchange, onsubmit, onTTadd, onTTdelete, onTTchange, service, serviceTypeList, disableStatusSelect }) {

    const statusArray = [];

    for (const key in Status) {
        statusArray.push(key);
    }

    return (
        <div className="container p-5">
            <form onSubmit={(e) => { e.preventDefault(); onsubmit(); }}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Service Name</span>
                    <input
                        value={service.name}
                        name="name"
                        onChange={(e) => onchange(e.target.name, e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Service name"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        required
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Description</span>
                    <textarea
                        value={service.description}
                        name="description"
                        onChange={(e) => onchange(e.target.name, e.target.value)}
                        className="form-control"
                        aria-label="With textarea"
                        placeholder="Description"
                        required
                    ></textarea>
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="serviceTypeSelect">Service Type</label>
                    <select
                        value={service.serviceTypeId}
                        name="serviceTypeId"
                        onChange={(e) => onchange(e.target.name, e.target.value)}
                        className="form-select"
                        id="serviceTypeSelect"
                        required
                    >
                        <option value={0}>Choose...</option>
                        {serviceTypeList.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="serviceStatusSelect">Service Status</label>
                    <select
                        disabled={disableStatusSelect}
                        value={service.status}
                        name="status"
                        onChange={(e) => onchange(e.target.name, e.target.value)}
                        className="form-select"
                        id="serviceStatusSelect"
                        required
                    >
                        <option value={0}>Choose...</option>
                        {statusArray.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="bg-white rounded rounded-3 p-3">
                    <h5>Add Ticket Types</h5>
                    {service.ticketTypes.map((item, i) => (
                        <div key={i}>
                            <div className="input-group my-3">
                                <span className="input-group-text" id={`ticket-type-addon-${i}`}>Ticket Type</span>
                                <input
                                    value={item.name}
                                    name="name"
                                    onChange={(e) => onTTchange(i, e.target.value)}
                                    type="text"
                                    className="form-control"
                                    placeholder="Ticket Type"
                                    aria-label="Username"
                                    aria-describedby={`ticket-type-addon-${i}`}
                                    required
                                />
                            </div>
                            <div className="d-flex align-items-center justify-content-center gap-3">
                                {i === service.ticketTypes.length - 1 && (
                                    <button onClick={() => onTTadd()} type="button" className="btn btn-primary">
                                        <i className="bi bi-file-plus"></i>
                                    </button>
                                )}
                                <button onClick={() => onTTdelete(i)} type="button" className="btn btn-danger">
                                    <i className="bi bi-file-x"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-flex">
                    <button type="submit" className="btn btn-outline-success my-5 w-100">Save</button>
                </div>
            </form>
        </div>
    );
}