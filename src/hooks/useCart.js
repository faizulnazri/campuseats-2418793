import { useContext } from 'react'
import { CartContext } from '../context/cart-context.js'

export function useCart() {
    const context = useContext(CartContext)

    // Make sure this hook is used inside CartProvider.
    if (!context) {
        throw new Error('useCart must be used inside <CartProvider>')
    }

    return context
}