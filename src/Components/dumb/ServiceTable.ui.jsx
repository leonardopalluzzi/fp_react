import DeleteModalUi from "./DeleteModal.ui";

export default function ServiceTableUi({ config, data, onDelete, onEdit, onShow }) {

    function getValue(obj, path) {
        return path.split(".").reduce((acc, key) => acc?.[key], obj);
    }
    console.log('cacca');
    console.log(config);
    console.log(data);




    return (
        <>
            <div className="container my-5">

                <div>
                    <button className="btn btn-outline-primary">Create Service</button>
                </div>
                <div className="table-responsive">
                    <table class="table table-light">
                        <thead>
                            <tr>
                                {
                                    config.columns.map((col, i) => (
                                        <>
                                            <th key={`label-${i}`} scope="col">{col.label}</th>
                                        </>
                                    ))
                                }
                                {
                                    config.actions.length > 0 && (
                                        <>
                                            <th>Actions</th>
                                        </>
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data.map((row, i) => (
                                    <>
                                        <tr key={`row-${i}`}>
                                            {
                                                config.columns.map((col, i) => (
                                                    <>
                                                        <td>{getValue(row, col.key)}</td>
                                                    </>
                                                ))
                                            }
                                            {
                                                config.actions.length > 0 && (
                                                    <>
                                                        <td>
                                                            <div className="d-flex align-items-center justify-content-center gap-2">
                                                                {
                                                                    config.actions.includes('view') && (
                                                                        <>
                                                                            <button className="btn btn-primary">
                                                                                <i className="bi bi-eye-fill"></i>
                                                                            </button>
                                                                        </>
                                                                    )
                                                                }
                                                                {
                                                                    config.actions.includes('update') && (
                                                                        <>
                                                                            <button className="btn btn-warning">
                                                                                <i className="bi bi-pencil-square"></i>
                                                                            </button>
                                                                        </>
                                                                    )
                                                                }
                                                                {
                                                                    config.actions.includes('delete') && (
                                                                        <>
                                                                            <DeleteModalUi itemId={row.id} deleteFunction={onDelete} />
                                                                        </>
                                                                    )
                                                                }

                                                            </div>
                                                        </td>
                                                    </>
                                                )
                                            }
                                        </tr>

                                    </>
                                ))

                            }
                        </tbody>
                    </table>
                </div>


            </div>

        </>
    )
}