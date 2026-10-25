function VendorCard({ vendor, isSelected, onSelect }) {
    return (
    <button
    type="button"
    className={isSelected ? 'card vendor-card selected' : 'card vendor-card'}
    onClick={() => onSelect(vendor.id)}
    >
    <div className="thumb">
        {vendor.id === '2418793-Faizul-Cafe' ? (
            <img
                src="/images/cheffaizul.png" 
                alt="Faizul Cafe"
            />
        ) : (
            <span aria-hidden="true">
                {vendor.name.charAt(0)}
            </span>
        )}
    </div>
    <div>
    <h3>{vendor.name}</h3>
    <p className="muted">{vendor.location}</p>
    <p className="muted">Open: {vendor.openHours}</p>
    <span className={vendor.isOpen ? 'status open' : 'status closed'}>
    {vendor.isOpen ? 'Open now' : 'Closed'}
    </span>
    </div>
    </button>
    )
}

export default VendorCard