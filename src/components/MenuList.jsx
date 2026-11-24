import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function MenuList({ items }) {
    const { addToCart } = useCart()
    const { user } = useAuth()

    if (items.length === 0) {
        return <p className="muted">No items on this menu yet.</p>
    }

    return (
        <div className="grid">
            {items.map((item) => (
                <MenuItemWithFavourite
                    key={item.id}
                    item={item}
                    user={user}
                    onAdd={addToCart}
                />
            ))}
        </div>
    )
}

function MenuItemWithFavourite({ item, user, onAdd }) {
    // Guests can browse the menu but need to log in to save favourites.
    if (!user) {
        return (
            <MenuItemCard
                item={item}
                onAdd={onAdd}
            />
        )
    }

    // Use a separate component for signed-in users to manage favourites.
    return (
        <SignedInMenuItem
            key={`${user.uid}-${item.id}`}
            item={item}
            userId={user.uid}
            onAdd={onAdd}
        />
    )
}

function SignedInMenuItem({ item, userId, onAdd }) {
    // Store favourite item IDs separately for each user.
    const [favourites, setFavourites] = useLocalStorage(
        `ce-favs-${userId}`,
        [],
    )

    // Add or remove an item from the user's favourites.
    function toggleFavourite(itemId) {
        setFavourites((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId],
        )
    }

    return (
        <MenuItemCard
            item={item}
            onAdd={onAdd}
            isFavourite={favourites.includes(item.id)}
            onToggleFavourite={toggleFavourite}
        />
    )
}

export default MenuList