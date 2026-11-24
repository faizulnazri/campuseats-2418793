import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { Loading } from './Status.jsx'

function ProtectedRoute() {
    const { user, loading } = useAuth()
    const location = useLocation()

    // Wait for Firebase to check the authentication state.
    if (loading) {
        return <Loading />
    }

    // Redirect unauthenticated users to the login page.
    if (!user) {
        return <Navigate
            to="/login"
            replace
            state={{ from: location.pathname }}
        />
    }

    // Allow authenticated users to access the protected page.
    return <Outlet />
}

export default ProtectedRoute