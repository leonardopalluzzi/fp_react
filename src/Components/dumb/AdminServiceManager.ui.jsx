import { useNavigate } from "react-router-dom"

export default function AdminServiceManagerUi({ serviceId }) {
    const navigate = useNavigate()

    return (
        <>
            <div className="card border-0 shadow p-4 mt-5">
                <div className="row">
                    <div className="col">
                        <button className="btn btn-outline-success" onClick={() => navigate(`/admin/user/create/${serviceId}`)}>+ Add Operator</button>
                    </div>
                </div>
            </div>
        </>
    )
}