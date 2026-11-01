
import { Link } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useCart } from '../hooks/useCart.js'
import MenuItemCard from '../components/MenuItemCard.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function FavouritesPage() {
    const { vendors, loading, error, reload } = useVendors()
    const { favourites, addToCart, toggleFavourite } = useCart()

    if (loading) return <Loading />
    if (error) return <ErrorMessage message={error} onRetry={reload} />

    const favouriteItems = vendors.flatMap((vendor) =>
        vendor.menu.filter((item) => favourites.includes(item.id))
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
                        isFavourite={true}
                        onToggleFavourite={toggleFavourite}
                    />
                ))}
            </div>
        </section>
    )
}

export default FavouritesPage