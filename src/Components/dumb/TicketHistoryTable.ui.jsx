import { formatDate } from "../../Js/UtilFunctions"

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
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                history.get.map((item, i) => (
                                    <>
                                        <tr class="">
                                            <td>{item.notes}</td>
                                            <td>{formatDate(item.changedAt)}</td>
                                            <td>{item.changedBy.username}</td>
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