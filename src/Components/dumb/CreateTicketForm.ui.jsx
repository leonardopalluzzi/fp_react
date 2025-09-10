export default function CreatTicketFormUi({ ticket, onchange, onsubmit, typeList, showNotes, actionName, title }) {
    return (
        <>
            <div className="container my-5">
                <h1 className="my-5">{title}</h1>
                <form onSubmit={(e) => { e.preventDefault(); onsubmit() }} >
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Title</span>
                        <input value={ticket.title} name="title" onChange={(e) => onchange(e.target.name, e.target.value)} type="text" className="form-control" placeholder="Title" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group mb-3 d-none">
                        <label className="input-group-text" htmlFor="inputGroupFile01">Attachment</label>
                        <input value={ticket.attachment} name="attachments" onChange={(e) => onchange(e.target.name, e.target.value)} type="file" className="form-control" id="inputGroupFile01" />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text">Description</span>
                        <textarea value={ticket.description} name="description" onChange={(e) => onchange(e.target.name, e.target.value)} className="form-control" aria-label="With textarea"></textarea>
                    </div>

                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Ticket Type</label>
                        <select value={ticket.typeId} name="typeId" onChange={(e) => onchange(e.target.name, e.target.value)} className="form-select" id="inputGroupSelect01">
                            <option value="">Choose...</option>
                            {
                                typeList.map((item, i) => (
                                    <option key={i} value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    {
                        showNotes && <div className="input-group mb-3">
                            <span className="input-group-text">Notes</span>
                            <textarea value={ticket.notes} name="notes" onChange={(e) => onchange(e.target.name, e.target.value)} className="form-control" aria-label="With textarea"></textarea>
                        </div>
                    }


                    <div className="d-flex align-items-center justify-content-center">
                        <button className="btn btn-outline-success w-100">{actionName}</button>
                    </div>

                </form>
            </div>
        </>
    )
}