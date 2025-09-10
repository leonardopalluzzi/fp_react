export default function ToastUi({ state, messages, closeMessage, textColor }) {

    const iconMap = {
        error: <i className="bi bi-x-circle-fill text-danger me-2"></i>,
        success: <i className="bi bi-check-circle-fill text-success me-2"></i>,
        warning: <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>,
    };

    return (
        <>
            <div className={`${textColor}`}>
                <div className="toast-container position-fixed bottom-0 end-0 p-3">
                    <div className={`toast show`} role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header">
                            <div>
                                {iconMap[state]}
                            </div>
                            <strong className={`me-auto ${textColor}`}>{state}</strong>
                            <small>{ }</small>
                            <button onClick={() => closeMessage()} type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div className="toast-body">
                            <ul className="list-unstyled">
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
            </div>



        </>
    )


}