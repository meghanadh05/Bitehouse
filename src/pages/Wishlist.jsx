import { useState } from 'react';
import EmptyState from '../components/EmptyState.jsx';
import NotifyModal from '../components/NotifyModal.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function Wishlist() {
  const { wishlistProducts } = useWishlist();
  const [notifyProduct, setNotifyProduct] = useState(null);
  const [, setNotificationVersion] = useState(0);

  if (wishlistProducts.length === 0) {
    return <EmptyState title="Your wishlist is empty" message="Save dishes you like and return to them later." />;
  }

  return (
    <div className="page">
      <section className="section-heading page-heading">
        <div>
          <p className="eyebrow">Wishlist</p>
          <h1>Saved dishes</h1>
        </div>
      </section>
      <div className="product-grid">
        {wishlistProducts.map((product) => (
          <ProductCard key={product.id} product={product} onNotify={setNotifyProduct} />
        ))}
      </div>
      <NotifyModal
        product={notifyProduct}
        onClose={() => setNotifyProduct(null)}
        onSaved={() => setNotificationVersion((version) => version + 1)}
      />
    </div>
  );
}
