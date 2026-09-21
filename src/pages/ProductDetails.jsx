import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import EmptyState from '../components/EmptyState.jsx';
import NotifyModal from '../components/NotifyModal.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import QuantitySelector from '../components/QuantitySelector.jsx';
import { getStockLabel } from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { products } from '../data/products.js';
import { hasAnyNotificationForProduct } from '../utils/notifications.js';
import { formatCurrency } from '../utils/storage.js';
import fallbackImage from '../assets/food/1-classic-chicken-burger.jpg';

const useFallbackImage = (event) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = fallbackImage;
};

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [notifyProduct, setNotifyProduct] = useState(null);
  const [, setNotificationVersion] = useState(0);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const notificationRequested = product && hasAnyNotificationForProduct(product.id);

  if (!product) {
    return <EmptyState title="Dish not found" message="The dish you are looking for is not available." />;
  }

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <div className="page">
      <Link className="back-link" to="/shop">
        ← Back to menu
      </Link>
      <section className="details-layout">
        <div className="details-image">
          <img src={product.image} alt={product.name} onError={useFallbackImage} />
        </div>
        <div className="details-content">
          <div className="detail-labels"><span className={`food-indicator ${product.veg ? 'veg' : 'non-veg'}`}><i /></span><p className="eyebrow">{product.category}</p>{product.bestseller && <span className="bestseller">Bestseller</span>}</div>
          <h1>{product.name}</h1>
          <p className="rating-line">★ {product.rating} rating</p>
          <div className="price-row large">
            <strong>{formatCurrency(product.price)}</strong>
            {product.originalPrice > product.price && <s>{formatCurrency(product.originalPrice)}</s>}
          </div>
          <p className={`stock-label ${product.stock === 0 ? 'out' : product.stock <= 5 ? 'low' : ''}`}>
            {getStockLabel(product.stock)}
          </p>
          <p className="details-description">{product.description}</p>
          <p className="unit-line">Portion: {product.unit}</p>

          {product.stock > 0 ? (
            <div className="detail-actions">
              <QuantitySelector quantity={quantity} max={product.stock} onChange={setQuantity} />
              <button className="button primary" type="button" onClick={() => addToCart(product, quantity)}>
                Add to Order
              </button>
            </div>
          ) : (
            <div className="detail-actions">
              {notificationRequested && <p className="requested-note">Notification requested ✓</p>}
              <button className="button secondary" type="button" onClick={() => setNotifyProduct(product)}>
                Notify Me
              </button>
            </div>
          )}

          <button className="button ghost" type="button" onClick={() => toggleWishlist(product.id)}>
            {isWishlisted(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>You may also like</h2>
        </div>
        <ProductGrid products={relatedProducts} onNotify={setNotifyProduct} />
      </section>

      <NotifyModal
        product={notifyProduct}
        onClose={() => setNotifyProduct(null)}
        onSaved={() => setNotificationVersion((version) => version + 1)}
      />
    </div>
  );
}
