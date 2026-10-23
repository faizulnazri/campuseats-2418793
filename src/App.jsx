
import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'
import CartPage from './components/CartPage.jsx'

function App() {
    // B2: Fetch vendors from the JSON file
    const [vendors, setVendors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [reloadKey, setReloadKey] = useState(0)

    const [selectedVendorId, setSelectedVendorId] = useState('')
    
    // B3: Cart and view state
    const [cart, setCart] = useState([])
    const [view, setView] = useState('menu')
    const [favourites, setFavourites] = useState([])
    const [showFavouritesOnly, setShowFavouritesOnly] = useState(false)
    const [lastOrder, setLastOrder] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        async function fetchVendors() {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch('/api/vendors.json', {
                    signal: controller.signal,
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch vendors')
                }

                const data = await response.json()

                setVendors(data)
                setSelectedVendorId((currentId) =>
                    currentId || data[0]?.id || ''
                )
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message)
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false)
                }
            }
        }

        fetchVendors()

        return () => controller.abort()
    }, [reloadKey])

    const selectedVendor = vendors.find(
        (vendor) => vendor.id === selectedVendorId
    )

    // Add an item or increase its quantity if it is already in the cart
    function handleAddToCart(item) {
        setCart((prev) => {
            const existing = prev.find(
                (line) => line.item.id === item.id
            )

            if (existing) {
                return prev.map((line) =>
                    line.item.id === item.id
                        ? { ...line, qty: line.qty + 1 }
                        : line
                )
            }

            return [...prev, { item, qty: 1 }]
        })
    }

    // Increase or decrease quantity
    function handleChangeQty(itemId, delta) {
        setCart((prev) =>
            prev
                .map((line) =>
                    line.item.id === itemId
                        ? { ...line, qty: line.qty + delta }
                        : line
                )
                .filter((line) => line.qty > 0)
        )
    }

    // Remove an item from the cart
    function handleRemove(itemId) {
        setCart((prev) =>
            prev.filter((line) => line.item.id !== itemId)
        )
    }

    // Total quantity shown in the header
    const cartCount = cart.reduce(
        (total, line) => total + line.qty,
        0
    )

    // Save the order, clear the cart and show the done view
    function handlePlaceOrder(details) {
        const total = cart.reduce(
            (sum, line) => sum + line.item.price * line.qty,
            0
        )

        setLastOrder({ ...details, total })
        setCart([])
        setView('done')
    }

    function handleToggleFavourite(itemId) {
        setFavourites((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId]
        )
    }

    const displayedMenu = selectedVendor
    ? selectedVendor.menu.filter((item) =>
          showFavouritesOnly
              ? favourites.includes(item.id)
              : true
      )
    : []

    // Choose what to display
    let content

    if (view === 'cart') {
        content = (
            <CartPage
                cart={cart}
                onChangeQty={handleChangeQty}
                onRemove={handleRemove}
                onPlaceOrder={handlePlaceOrder}
            />
        )
    } else if (view === 'done') {
        content = (
            <section className="card">
                <h2>Order placed!</h2>
                {lastOrder && (
                    <>
                        <p>Name: {lastOrder.name}</p>
                        <p>Mahallah: {lastOrder.mahallah}</p>
                        <p>Pickup time: {lastOrder.pickupTime}</p>
                        <p>Total: RM {lastOrder.total.toFixed(2)}</p>
                    </>
                )}
                <button
                    type="button"
                    className="btn"
                    onClick={() => setView('menu')}
                >
                    Back to vendors
                </button>
            </section>
        )
    } else if (loading) {
        content = <Loading />
    } else if (error) {
        content = (
            <ErrorMessage
                message={error}
                onRetry={() => setReloadKey((key) => key + 1)}
            />
        )
    } else if (selectedVendor) {
        content = (
            <>
                <section>
                    <h2 className="section-title">Choose a vendor</h2>

                    <div className="vendor-grid">
                        {vendors.map((vendor) => (
                            <VendorCard
                                key={vendor.id}
                                vendor={vendor}
                                isSelected={
                                    vendor.id === selectedVendorId
                                }
                                onSelect={setSelectedVendorId}
                            />
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="section-title">
                        Menu: {selectedVendor.name}
                    </h2>
                    
                    <button
                        type="button"
                        className="btn"
                        onClick={() => setShowFavouritesOnly((prev) => !prev)}
                    >
                        {showFavouritesOnly ? 'Show all items' : 'Favourites only'}
                    </button>

                    <MenuList
                        items={displayedMenu}
                        onAdd={handleAddToCart}
                        favourites={favourites}
                        onToggleFavourite={handleToggleFavourite}
                    />
                </section>
            </>
        )
    } else {
        content = <p>No vendors available.</p>
    }

    return (
        <>
            <Header
                cartCount={cartCount}
                onShowMenu={() => setView('menu')}
                onShowCart={() => setView('cart')}
            />

            <main className="container">{content}</main>

            <Footer />
        </>
    )
}

export default App