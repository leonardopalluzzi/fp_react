export default function TicketHistoryTasbleUi({ history }) {
    return (
        <>
            <div className="card my-5 p-4 border-0 shadow">
                <h2>Ticket History</h2>
                <div
                    class="table-responsive"
                >
                    <table
                        class="table"
                    >
                        <thead>
                            <tr>
                                <th scope="col">Notes</th>
                                <th scope="col">Changed At</th>
                                <th scope="col">Changed By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                history.get.map((item, i) => (
                                    <>
                                        <tr class="">
                                            <td>{item.notes}</td>
                                            <td>{item.changedAt}</td>
                                            <td>{item.changedBy.username}</td>
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