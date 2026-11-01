
import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js'

function MenuList({ items }) {
    const { addToCart, favourites, toggleFavourite } = useCart()

    if (items.length === 0) {
        return <p className="muted">No items on this menu yet.</p>
    }

    return (
        <div className="grid">
            {items.map((item) => (
                <MenuItemCard
                    key={item.id}
                    item={item}
                    onAdd={addToCart}
                    isFavourite={favourites.includes(item.id)}
                    onToggleFavourite={toggleFavourite}
                />
            ))}
        </div>
    )
}

export default MenuList