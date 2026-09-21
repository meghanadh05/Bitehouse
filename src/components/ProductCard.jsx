import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { hasAnyNotificationForProduct } from '../utils/notifications.js';
import { formatCurrency } from '../utils/storage.js';

const fallbackImage =
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80';

export function getStockLabel(stock) {
  if (stock === 0) return 'Currently unavailable';
  if (stock <= 5) return `ONLY ${stock} LEFT`;
  return 'IN STOCK';
}

export default function ProductCard({ product, onNotify }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wished = isWishlisted(product.id);
  const requested = product.stock === 0 && hasAnyNotificationForProduct(product.id);

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link" aria-label={`View ${product.name}`}>
        <img src={product.image} alt={product.name} onError={(event) => (event.currentTarget.src = fallbackImage)} />
      </Link>
      <div className="product-card-body">
        <div className="product-meta">
          <div className="food-flags"><span className={`food-indicator ${product.veg ? 'veg' : 'non-veg'}`} aria-label={product.veg ? 'Vegetarian' : 'Non-vegetarian'}><i /></span>{product.bestseller && <span className="bestseller">Bestseller</span>}</div>
          <button
            type="button"
            className={`heart-button ${wished ? 'active' : ''}`}
            onClick={() => toggleWishlist(product.id)}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            title={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {wished ? '♥' : '♡'}
          </button>
        </div>
        <Link className="product-name" to={`/product/${product.id}`}>
          {product.name}
        </Link>
        <p className="product-description">{product.description}</p>
        <div className="product-subline">
          <span>★ {product.rating}</span>
          <span>{product.unit}</span>
        </div>
        <div className="price-row">
          <strong>{formatCurrency(product.price)}</strong>
          {product.originalPrice > product.price && <s>{formatCurrency(product.originalPrice)}</s>}
        </div>
        <p className={`stock-label ${product.stock === 0 ? 'out' : product.stock <= 5 ? 'low' : ''}`}>
          {getStockLabel(product.stock)}
        </p>
        {product.stock === 0 ? (
          <>
            {requested && <p className="requested-note">Notification requested ✓</p>}
            <button className="button secondary add-button" type="button" onClick={() => onNotify(product)}>
              Notify Me
            </button>
          </>
        ) : (
          <button className="button secondary add-button" type="button" onClick={() => addToCart(product)}>
            Add
          </button>
        )}
      </div>
    </article>
  );
}
