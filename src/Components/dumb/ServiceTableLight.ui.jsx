export default function ServiceTabelLightUi({ services, onShow }) {
    console.log(services);

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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                services.map(item => (
                                    <>
                                        <tr class="">
                                            <td>{item.name}</td>
                                            <td>{item.code}</td>
                                            <td>{item.type.name}</td>
                                            <td>{item.status}</td>
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