import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export function CartProvider({ children }) {
    // Store cart items and orders in browser localStorage.
    const [cart, setCart] = useLocalStorage('campuseats-cart', [])
    const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

    // Add an item to the cart or increase its quantity if it already exists.
    function addToCart(item) {
        setCart((prev) => {
            const existing = prev.find((line) => line.item.id === item.id)

            if (existing) {
                return prev.map((line) =>
                    line.item.id === item.id
                        ? { ...line, qty: line.qty + 1 }
                        : line,
                )
            }

            return [...prev, { item, qty: 1 }]
        })
    }

    // Increase or decrease an item's quantity.
    // Remove the item automatically when its quantity reaches zero.
    function changeQty(itemId, delta) {
        setCart((prev) =>
            prev
                .map((line) =>
                    line.item.id === itemId
                        ? { ...line, qty: line.qty + delta }
                        : line,
                )
                .filter((line) => line.qty > 0),
        )
    }

    // Remove an item from the cart.
    function removeFromCart(itemId) {
        setCart((prev) => prev.filter((line) => line.item.id !== itemId))
    }

    // Create an order using the current cart items.
    function placeOrder(details) {
        const order = {
            id: `ord-${Date.now()}`,
            createdAt: new Date().toISOString(),
            ...details,
            lines: cart,
            total: cart.reduce(
                (sum, line) => sum + line.item.price * line.qty,
                0,
            ),
        }

        setOrders((prev) => [order, ...prev])
        setCart([])

        return order
    }

    // Calculate the total number of items and cart price.
    const count = cart.reduce((sum, line) => sum + line.qty, 0)
    const total = cart.reduce(
        (sum, line) => sum + line.item.price * line.qty,
        0,
    )

    // Share cart data and functions with other components.
    const value = {
        cart,
        orders,
        count,
        total,
        addToCart,
        changeQty,
        removeFromCart,
        placeOrder,
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}