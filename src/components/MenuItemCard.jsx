
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

            <button
                type="button"
                className="btn"
                onClick={() => onToggleFavourite(item.id)}
            >
                {isFavourite ? '♥ Favourite' : '♡ Add to favourites'}
            </button>
        </article>
    )
}

export default MenuItemCard