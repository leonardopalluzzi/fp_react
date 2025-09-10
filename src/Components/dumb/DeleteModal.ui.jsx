import { useNavigate } from "react-router-dom"
export default function DeleteModalUi({ itemId, deleteFunction }) {
    return (
        <>
            <button
                type="button"
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#modalId"
            >
                <i className="bi bi-file-earmark-x-fill"></i>
            </button>


            <div
                className="modal fade"
                id="modalId"
                tabIndex="-1"
                data-bs-backdrop="static"
                data-bs-keyboard="false"

                role="dialog"
                aria-labelledby="modalTitleId"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalTitleId">
                                Confirm delete operation
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to proceed?
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button onClick={() => deleteFunction(itemId)} type="button" className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                const myModal = new bootstrap.Modal(
                document.getElementById("modalId"),
                options,
                );
            </script>
        </>
    )
}