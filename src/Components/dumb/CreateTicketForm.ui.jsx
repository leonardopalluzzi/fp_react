export default function CreatTicketFormUi({ ticket, onchange, onsubmit }) {
    return (
        <>
            <div className="container my-5">
                <h1 className="my-5">Create ticket for service: service_name</h1>
                <form onSubmit={(e) => { e.preventDefault(); onsubmit() }} >
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Title</span>
                        <input value={ticket.title} name="title" onChange={(e) => onchange(e.target.name, e.target.value)} type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>

                    <div class="input-group mb-3 d-none">
                        <label class="input-group-text" for="inputGroupFile01">Attachment</label>
                        <input value={ticket.attachment} name="attachments" onChange={(e) => onchange(e.target.name, e.target.value)} type="file" class="form-control" id="inputGroupFile01" />
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text">Description</span>
                        <textarea value={ticket.description} name="description" onChange={(e) => onchange(e.target.name, e.target.value)} class="form-control" aria-label="With textarea"></textarea>
                    </div>

                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Ticket Type</label>
                        <select value={ticket.typeId} name="typeId" onChange={(e) => onchange(e.target.name, e.target.value)} class="form-select" id="inputGroupSelect01">
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

                    <div class="input-group mb-3">
                        <span class="input-group-text">Notes</span>
                        <textarea value={ticket.notes} name="notes" onChange={(e) => onchange(e.target.name, e.target.value)} class="form-control" aria-label="With textarea"></textarea>
                    </div>

                    <div className="d-flex align-items-center justify-content-center">
                        <button className="btn btn-outline-success w-100">Create</button>
                    </div>

                </form>
            </div>
        </>
    )
}