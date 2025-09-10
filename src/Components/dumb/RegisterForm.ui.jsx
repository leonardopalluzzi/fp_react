export default function RegisterFormUi({ user, onsubmit, onchange, label, passwordRequired }) {
    return (
        <>
            <form onSubmit={(e) => { e.preventDefault(); onsubmit() }}>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={user.username}
                        onChange={(e) => onchange(e.target.name, e.target.value)}
                        id=""
                        aria-describedby="helpId"
                        placeholder="cool username"
                    />
                    <small id="helpId" className="form-text text-muted">Choose your username</small>
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email}
                        onChange={(e) => onchange(e.target.name, e.target.value)}

                        id=""
                        aria-describedby="helpId"
                        placeholder="email@email.com"
                        required

                    />
                    <small id="helpId" className="form-text text-muted">Type your email</small>
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={user.password}
                        onChange={(e) => onchange(e.target.name, e.target.value)}

                        id=""
                        aria-describedby="helpId"
                        placeholder="SafePass.01!"
                        required={passwordRequired}
                    />
                    <small id="helpId" className="form-text text-muted">Choose yuor password</small>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <button type="submit" className="btn btn-primary fs-4">{label ? label : 'Register'}</button>
                </div>

            </form>
        </>
    )
}