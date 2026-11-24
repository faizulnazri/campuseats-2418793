import { Link } from 'react-router'

function MenuItemCard({ item, onAdd, isFavourite, onToggleFavourite }) {
    return (
        <article className="card menu-card">
            <div className="thumb">
                {item.image ? (
                    <img src={item.image} alt={item.name} />
                ) : (
                    item.name.charAt(0)
                )}
            </div>

            <p className={`tag ${item.category.toLowerCase()}`}>
                {item.category}
            </p>

            <h3>{item.name}</h3>
            <p className="muted">{item.description}</p>
            <p className="price">RM {item.price.toFixed(2)}</p>

            <button
                type="button"
                className="btn"
                disabled={!item.available}
                onClick={() => onAdd(item)}
            >
                {item.available ? 'Add to cart' : 'Sold out'}
            </button>

            {/* Show the favourite button only to signed-in users. */}
            {onToggleFavourite ? (
                <button
                    type="button"
                    className="btn"
                    aria-pressed={isFavourite}
                    onClick={() => onToggleFavourite(item.id)}
                >
                    {isFavourite ? '♥ Favourite' : '♡ Add to favourites'}
                </button>
            ) : (
                // Guests must log in before saving favourite items.
                <Link to="/login" className="favourite-login-link">
                    Log in to save favourites
                </Link>
            )}
        </article>
    )
}

export default MenuItemCard