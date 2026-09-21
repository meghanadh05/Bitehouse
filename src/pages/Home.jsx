import { Link } from 'react-router-dom';
import { useState } from 'react';
import { categories, products } from '../data/products.js';
import ProductGrid from '../components/ProductGrid.jsx';
import NotifyModal from '../components/NotifyModal.jsx';
import OrderTypeSelector from '../components/OrderTypeSelector.jsx';

export default function Home() {
  const [notifyProduct, setNotifyProduct] = useState(null);
  const [, setNotificationVersion] = useState(0);
  const popularProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);

  return (
    <div className="page">
      <section className="home-hero">
        <div>
          <p className="eyebrow">BiteHouse</p>
          <h1>Good food.<br />Made fresh.</h1>
          <p>Your favourite meals, prepared fresh when you order.</p>
          <div className="hero-actions"><Link className="button primary" to="/shop">Order Now</Link><Link className="button secondary" to="/shop">View Menu</Link></div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85"
          alt="Fresh burger served with fries"
        />
      </section>

      <section className="order-type-section"><OrderTypeSelector /></section>

      <section className="section">
        <div className="section-heading">
          <h2>Explore the menu</h2>
          <Link to="/categories">View all dishes</Link>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link key={category} to={`/shop?category=${encodeURIComponent(category)}`} className="category-tile">
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="section" id="offers">
        <div className="section-heading">
          <h2>Popular dishes</h2>
          <Link to="/shop">See full menu</Link>
        </div>
        <ProductGrid products={popularProducts} onNotify={setNotifyProduct} />
      </section>

      <section className="info-strip">
        <div>
          <strong>Made to Order</strong>
          <span>Prepared fresh in our kitchen</span>
        </div>
        <div>
          <strong>Dine In or Takeaway</strong>
          <span>Choose what works for you</span>
        </div>
        <div>
          <strong>20–25 Minutes</strong>
          <span>Fast, careful preparation</span>
        </div>
      </section>

      <NotifyModal
        product={notifyProduct}
        onClose={() => setNotifyProduct(null)}
        onSaved={() => setNotificationVersion((version) => version + 1)}
      />
    </div>
  );
}
