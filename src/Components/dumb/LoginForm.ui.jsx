export default function LoginFormUi({ user, onchange, onsubmit }) {
    return (
        <>
            <div className="container">
                <h1>Login</h1>
                <form action="" onSubmit={(e) => { e.preventDefault(); onsubmit() }}>
                    <div class="mb-3 my-4">
                        <label for="" class="form-label">Username</label>
                        <input
                            type="text"
                            class="form-control"
                            name="username"
                            value={user.username}
                            onChange={(e) => onchange(e.target.name, e.target.value)}
                            id=""
                            aria-describedby="helpId"
                            placeholder="mario rossi"
                        />
                        <small id="helpId" class="form-text text-muted">Type your username</small>
                        <div class="mb-3 my-4">
                            <label for="" class="form-label">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                name="password"
                                value={user.password}
                                onChange={(e) => { onchange(e.target.name, e.target.value) }}
                                id=""
                                aria-describedby="helpId"
                                placeholder="SafePass01"
                            />
                            <small id="helpId" class="form-text text-muted">Type your password</small>
                        </div>

                    </div>
                    <button className="btn btn-primary" type="submit">Login</button>

                </form>
                <div className="actions d-flex align-items-center justify-content-center gap-4">
                    <button className="btn btn-primary">Register</button>
                    <button className="btn btn-primary">Recover Password</button>
                </div>
            </div>
        </>
    )

}