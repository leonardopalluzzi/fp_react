export default function LoginFormUi({ user, onchange, onsubmit }) {
    console.log('render login form');

    return (
        <>
            <div className="container my-5">
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
                            required
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
                                required
                            />
                            <small id="helpId" class="form-text text-muted">Type your password</small>
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