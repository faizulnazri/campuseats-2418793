import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
    // Load the saved value when the hook is first initialized.
    const [value, setValue] = useState(() => {
        try {
            const saved = localStorage.getItem(key)
            return saved !== null ? JSON.parse(saved) : initialValue
        } catch {
            return initialValue
        }
    })

    // Save the latest value whenever the key or value changes.
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch {
            // Continue working if storage is full or unavailable.
        }
    }, [key, value])

    return [value, setValue]
}