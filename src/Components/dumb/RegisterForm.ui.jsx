export default function RegisterFormUi({ user, onsubmit, onchange, label, passwordRequired }) {
    return (
        <>
            <form onSubmit={(e) => { e.preventDefault(); onsubmit() }}>
                <div class="mb-3">
                    <label for="" class="form-label">Username</label>
                    <input
                        type="text"
                        class="form-control"
                        name="username"
                        value={user.username}
                        onChange={(e) => onchange(e.target.name, e.target.value)}
                        id=""
                        aria-describedby="helpId"
                        placeholder="cool username"
                    />
                    <small id="helpId" class="form-text text-muted">Choose your username</small>
                </div>

                <div class="mb-3">
                    <label for="" class="form-label">Email</label>
                    <input
                        type="email"
                        class="form-control"
                        name="email"
                        value={user.email}
                        onChange={(e) => onchange(e.target.name, e.target.value)}

                        id=""
                        aria-describedby="helpId"
                        placeholder="email@email.com"
                        required

                    />
                    <small id="helpId" class="form-text text-muted">Type your email</small>
                </div>

                <div class="mb-3">
                    <label for="" class="form-label">Password</label>
                    <input
                        type="password"
                        class="form-control"
                        name="password"
                        value={user.password}
                        onChange={(e) => onchange(e.target.name, e.target.value)}

                        id=""
                        aria-describedby="helpId"
                        placeholder="SafePass.01!"
                        required={passwordRequired}
                    />
                    <small id="helpId" class="form-text text-muted">Choose yuor password</small>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <button type="submit" className="btn btn-primary fs-4">{label ? label : 'Register'}</button>
                </div>

            </form>
        </>
    )
}