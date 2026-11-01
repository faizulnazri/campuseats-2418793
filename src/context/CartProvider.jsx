import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export function CartProvider({ children }) {
    const [cart, setCart] = useLocalStorage('campuseats-cart', [])
    const [orders, setOrders] = useLocalStorage('campuseats-orders', [])
    const [favourites, setFavourites] = useLocalStorage('campuseats-favourites', [])

    function addToCart(item) {
        setCart((prev) => {
            const existing = prev.find((line) => line.item.id === item.id)
            if (existing) {
                return prev.map((line) =>
                    line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line,
                )
            }
            return [...prev, { item, qty: 1 }]
        })
    }

    // changeQty and removeFromCart
    function changeQty(itemId, delta) {
        setCart((prev) =>
            prev
                .map((line) =>
                    line.item.id === itemId ? { ...line, qty: line.qty + delta } : line,
                )
                .filter((line) => line.qty > 0),
        )
    }

    function removeFromCart(itemId) {
        setCart((prev) => prev.filter((line) => line.item.id !== itemId))
    }

    // placeOrder, count, total and the return
    function placeOrder(details) {
        const order = {
            id: `ord-${Date.now()}`,
            createdAt: new Date().toISOString(),
            ...details,
            lines: cart,
            total: cart.reduce((sum, line) => sum + line.item.price * line.qty, 0),
        }
        setOrders((prev) => [order, ...prev])
        setCart([])
        return order
    }

    function toggleFavourite(itemId) {
        setFavourites((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId],
        )
    }

    const count = cart.reduce((sum, line) => sum + line.qty, 0)
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    
    const value = {
        cart, orders, favourites, count, total, addToCart, changeQty, removeFromCart, placeOrder, toggleFavourite,
    }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}