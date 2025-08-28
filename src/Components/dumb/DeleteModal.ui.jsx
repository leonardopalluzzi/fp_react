import { useNavigate } from "react-router-dom"
export default function DeleteModalUi({ itemId, deleteFunction }) {
    return (
        <>
            <button
                type="button"
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#modalId"
            >
                <i class="bi bi-file-earmark-x-fill"></i>
            </button>


            <div
                class="modal fade"
                id="modalId"
                tabindex="-1"
                data-bs-backdrop="static"
                data-bs-keyboard="false"

                role="dialog"
                aria-labelledby="modalTitleId"
                aria-hidden="true"
            >
                <div
                    class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
                    role="document"
                >
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalTitleId">
                                Confirm delete operation
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to proceed?
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button onClick={() => deleteFunction(itemId)} type="button" class="btn btn-danger" data-bs-dismiss="modal">Delete</button>
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