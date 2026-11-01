
import { Link } from 'react-router'

function VendorCard({ vendor }) {
    return (
        <Link
            to={`/vendor/${vendor.id}`}
            className="card vendor-card"
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
        </Link>
    )
}

export default VendorCard