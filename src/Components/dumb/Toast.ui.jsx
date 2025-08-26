export default function ToastUi({ state, messages, closeMessage }) {
    return (
        <>
            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div className={`toast show`} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <img src="..." className="rounded me-2" alt="..." />
                        <strong className="me-auto">{state}</strong>
                        <small>{ }</small>
                        <button onClick={() => closeMessage()} type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        <ul>
                            {
                                messages.map((message, i) => (
                                    <>
                                        <li key={i}>{message}</li>
                                    </>
                                ))
                            }
                        </ul>

                    </div>
                </div>
            </div>


        </>
    )


}