import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { authErrorMessage } from '../authErrors.js'

function LoginPage() {
    const { login, loginWithGoogle, resetPassword } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const goTo = location.state?.from ?? '/'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)
    const [message, setMessage] = useState('')

    // Handle email and password login.
    async function handleSubmit(event) {
        event.preventDefault()
        setError('')
        setBusy(true)

        try {
            await login(email, password)
            navigate(goTo, { replace: true })
        } catch (err) {
            setError(authErrorMessage(err))
        } finally {
            setBusy(false)
        }
    }

    // Handle Google account login.
    async function handleGoogle() {
        setError('')
        setBusy(true)

        try {
            await loginWithGoogle()
            navigate(goTo, { replace: true })
        } catch (err) {
            setError(authErrorMessage(err))
        } finally {
            setBusy(false)
        }
    }

    // Send a password reset email.
    async function handleResetPassword() {
        setError('')
        setMessage('')

        if (!email.trim()) {
            setError('Please enter your email address first.')
            return
        }

        setBusy(true)

        try {
            await resetPassword(email.trim())
            setMessage('Password reset email sent. Please check your inbox.')
        } catch (err) {
            setError(authErrorMessage(err))
        } finally {
            setBusy(false)
        }
    }

    return (
        <section className="auth-page">
            <form className="card form" onSubmit={handleSubmit}>
                <h2>Log in</h2>

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="forgot-password">
                    <button
                        type="button"
                        className="link"
                        onClick={handleResetPassword}
                        disabled={busy}
                    >
                        Forgot password?
                    </button>
                </div>

                {error && (
                    <p className="field-error" role="alert">
                        {error}
                    </p>
                )}

                {message && (
                    <p className="success-message" role="status">
                        {message}
                    </p>
                )}

                <button type="submit" className="btn" disabled={busy}>
                    {busy ? 'Logging in…' : 'Log in'}
                </button>

                <button
                    type="button"
                    className="btn btn-outline"
                    onClick={handleGoogle}
                    disabled={busy}
                >
                    Continue with Google
                </button>

                <p className="muted">
                    No account? <Link to="/register" state={location.state}>Register</Link>
                </p>
            </form>
        </section>
    )
}

export default LoginPage