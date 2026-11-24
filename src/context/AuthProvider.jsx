import { useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail,
} from 'firebase/auth'
import { auth } from '../firebase.js'
import { AuthContext } from './auth-context.js'

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Listen for Firebase authentication state changes.
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
            setLoading(false)
        })

        // Stop listening when the provider unmounts.
        return unsubscribe
    }, [])

    // Create a new account and save the user's display name.
    async function register(name, email, password) {
        const credential = await createUserWithEmailAndPassword(auth, email, password)

        await updateProfile(credential.user, { displayName: name })
        setUser({ ...credential.user, displayName: name })
    }

    // Sign in using email and password.
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Sign in using a Google account.
    function loginWithGoogle() {
        return signInWithPopup(auth, new GoogleAuthProvider())
    }

    // Sign out the current user.
    function logout() {
        return signOut(auth)
    }

    // Send a password reset email to the user.
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    // Share authentication data and functions with the application.
    const value = {
        user,
        loading,
        register,
        login,
        loginWithGoogle,
        logout,
        resetPassword,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}