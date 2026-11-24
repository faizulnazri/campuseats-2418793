import { Link } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import MenuItemCard from '../components/MenuItemCard.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function FavouritesPage() {
    const { vendors, loading, error, reload } = useVendors()
    const { addToCart } = useCart()
    const { user } = useAuth()

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={reload} />
    }

    if (!user) {
        return (
            <section>
                <h2 className="section-title">My Favourite Items</h2>
                <p className="muted">
                    Please <Link to="/login">log in</Link> to view your favourites.
                </p>
            </section>
        )
    }

    return (
        <UserFavourites
            key={user.uid}
            vendors={vendors}
            userId={user.uid}
            addToCart={addToCart}
        />
    )
}

function UserFavourites({ vendors, userId, addToCart }) {
    // Retrieve favourite item IDs belonging to the current user.
    const [favourites, setFavourites] = useLocalStorage(
        `ce-favs-${userId}`,
        [],
    )

    // Add or remove an item from the favourites list.
    function toggleFavourite(itemId) {
        setFavourites((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId],
        )
    }

    // Find the full menu items matching the saved favourite IDs.
    const favouriteItems = vendors.flatMap((vendor) =>
        vendor.menu.filter((item) => favourites.includes(item.id)),
    )

    if (favouriteItems.length === 0) {
        return (
            <section>
                <h2 className="section-title">My Favourite Items</h2>
                <p className="muted">
                    No favourite items yet. <Link to="/">Browse vendors</Link>
                </p>
            </section>
        )
    }

    return (
        <section>
            <h2 className="section-title">My Favourite Items</h2>

            <div className="grid">
                {favouriteItems.map((item) => (
                    <MenuItemCard
                        key={item.id}
                        item={item}
                        onAdd={addToCart}
                        isFavourite={favourites.includes(item.id)}
                        onToggleFavourite={toggleFavourite}
                    />
                ))}
            </div>
        </section>
    )
}

export default FavouritesPage