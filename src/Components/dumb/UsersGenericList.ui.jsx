
import DeleteModalUi from "./DeleteModal.ui"
import { formatDate } from "../../Js/UtilFunctions";

export default function UsersGenericListUi({ users, title, onedit, onshow, ondelete, disableShow, disableEdit, disableDelete }) {
    console.log(users);

    return (
        <>
            <div className="col">
                <div className="my-5 bg-white rounded rounded-4 p-3 shadow">
                    <h4 className="p-2">{title}</h4>
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
                                    users.map(c => (
                                        <>
                                            <tr className="">
                                                <td>{c.username}</td>
                                                <td>{c.email}</td>
                                                <td>{formatDate(c.createdAt)}</td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                                        <button disabled={disableShow} onClick={() => onshow(c.id)} className="btn btn-primary"><i class="bi bi-eye-fill"></i></button>
                                                        <button disabled={disableEdit} onClick={() => onedit(c.id)} className="btn btn-warning"><i class="bi bi-pencil-square"></i></button>
                                                        {
                                                            !disableDelete && <DeleteModalUi itemId={c.id} deleteFunction={ondelete} />
                                                        }
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
            </div>
        </>
    )
}