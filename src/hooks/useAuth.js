import { useContext } from 'react'
import { AuthContext } from '../context/auth-context.js'

export function useAuth() {
    const context = useContext(AuthContext)

    // Make sure this hook is used inside AuthProvider.
    if (!context) {
        throw new Error('useAuth must be used inside <AuthProvider>')
    }

    return context
}