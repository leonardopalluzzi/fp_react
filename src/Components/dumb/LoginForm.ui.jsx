export default function LoginFormUi({ user, onchange, onsubmit }) {
    return (
        <>
            <div className="container my-5">
                <h1>Login</h1>
                <form action="" onSubmit={(e) => { e.preventDefault(); onsubmit() }}>
                    <div className="mb-3 my-4">
                        <label htmlFor="" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={user.username}
                            onChange={(e) => onchange(e.target.name, e.target.value)}
                            id=""
                            aria-describedby="helpId"
                            placeholder="mario rossi"
                            required
                        />
                        <small id="helpId" className="form-text text-muted">Type your username</small>
                        <div className="mb-3 my-4">
                            <label htmlFor="" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={user.password}
                                onChange={(e) => { onchange(e.target.name, e.target.value) }}
                                id=""
                                aria-describedby="helpId"
                                placeholder="SafePass01"
                                required
                            />
                            <small id="helpId" className="form-text text-muted">Type your password</small>
                        </div>

                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                        <button className="btn btn-primary fs-4" type="submit">Login</button>

                    </div>
                </form>
            </div>
        </>
    )

}