export default function ServiceTabelLightUi({ services, onShow }) {
    return (
        <>
            <div className="card border-0 overflow-hidden">
                <div
                    class="table-responsive"
                >
                    <table
                        class="table"
                    >
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Code</th>
                                <th scope="col">Type</th>
                                <th scope="col">Status</th>
                                <th scope="vol">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                services.map(item => (
                                    <>
                                        <tr class="">
                                            <td>{item.name}</td>
                                            <td>{item.code}</td>
                                            <td>{item.serviceType.name}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => onShow(item.id)}><i class="bi bi-eye"></i></button>
                                            </td>
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