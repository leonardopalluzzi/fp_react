import DeleteModalUi from "./DeleteModal.ui";
import DataWrapper from "../smart/DataWrapper";

export default function ShowServiceAdminListUi({ customers, operators, handleOperatorShow, handleOperatorEdit, handleOperatorDelete }) {

    return (
        <>
            <div className="w-100">
                <div className="row row-cols-1 row-cols-md-2">
                    <div className="col">
                        <DataWrapper
                            css={''}
                            list={1}
                        >
                            {/* tabella clienti  */}

                            <div className="my-5 bg-white rounded rounded-4 p-3 shadow">
                                <h4>Customers</h4>
                                <div
                                    className="table-responsive"
                                >
                                    <table
                                        className="table table-white"
                                    >
                                        <thead>
                                            <tr>
                                                <th scope="col">Username</th>
                                                <th scope="col">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                customers.map(c => (
                                                    <>
                                                        <tr className="">
                                                            <td>{c.username}</td>
                                                            <td>{c.email}</td>
                                                        </tr>
                                                    </>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </DataWrapper>
                    </div>


                    <div className="col">
                        <DataWrapper
                            css={''}
                            list={2}
                        >
                            {/* tabella operatori  */}
                            <div className="my-5 bg-white rounded rounded-4 p-3 shadow">
                                <h4 className="p-2">Operators</h4>
                                <div
                                    className="table-responsive"
                                >
                                    <table
                                        className="table table-white"
                                    >
                                        <thead>
                                            <tr>
                                                <th scope="col">Username</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Created At</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                operators.map(c => (
                                                    <>
                                                        <tr className="">
                                                            <td>{c.username}</td>
                                                            <td>{c.email}</td>
                                                            <td>{c.createdAt}</td>
                                                            <td>
                                                                <div className="d-flex align-items-center justify-content-center gap-2">
                                                                    <button onClick={() => handleOperatorShow(c.id)} className="btn btn-primary"><i class="bi bi-eye-fill"></i></button>
                                                                    <button onClick={() => handleOperatorEdit(c.id)} className="btn btn-warning"><i class="bi bi-pencil-square"></i></button>
                                                                    <DeleteModalUi itemId={c.id} deleteFunction={handleOperatorDelete} />
                                                                </div>

                                                            </td>
                                                        </tr>
                                                    </>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>


                        </DataWrapper>
                    </div>
                </div>
            </div >
        </>
    )
}