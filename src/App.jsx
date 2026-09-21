import { useState } from 'react';
import { categories, products } from './data/products.js';

function Navbar({ cartCount }) {
  return (
    <header className="site-header">
      <nav className="navbar">
        <a className="brand" href="#home">
          <span className="brand-mark">BH</span>
          <strong>BiteHouse</strong>
        </a>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a className="cart-link" href="#cart">Cart ({cartCount})</a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div>
        <p className="eyebrow">BiteHouse</p>
        <h1>Good food. Made fresh.</h1>
        <div className="hero-actions">
          <a className="button primary" href="#menu">View Menu</a>
          <a className="button secondary icon-button" href="tel:9492643179" aria-label="Call owner">
            <span aria-hidden="true">☎</span>
            Call
          </a>
          <a className="button secondary icon-button" href="sms:9492643179" aria-label="Message owner">
            <span aria-hidden="true">✉</span>
            Message
          </a>
        </div>
      </div>
    </section>
  );
}

function CategoryButtons({ selectedCategory, onSelectCategory }) {
  return (
    <section className="section">
      <h2>Categories</h2>
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            className={selectedCategory === category ? 'active' : ''}
            key={category}
            onClick={() => onSelectCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}

function FoodCard({ item, onAddToCart }) {
  const isAvailable = item.available !== false;

  return (
    <article className="food-card">
      <img src={item.image} alt={item.name} />
      <div className="food-card-body">
        {!isAvailable && <span className="unavailable-label">Unavailable</span>}
        <h3>{item.name}</h3>
        <div className="food-card-footer">
          <strong>₹{item.price}</strong>
          <button
            className="button secondary"
            disabled={!isAvailable}
            onClick={() => onAddToCart(item)}
            type="button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

function FoodMenu({ items, onAddToCart }) {
  return (
    <section className="section" id="menu">
      <div className="section-heading">
        <h2>Food Menu</h2>
        <span>{items.length} items</span>
      </div>
      <div className="food-grid">
        {items.map((item) => (
          <FoodCard item={item} key={item.id} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}

function Cart({ cartItems, onIncrease, onDecrease, onRemove, onClear }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="section cart-section" id="cart">
      <div className="section-heading">
        <h2>Cart</h2>
        {cartItems.length > 0 && (
          <button className="text-button" onClick={onClear} type="button">
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty. Add something tasty from the menu.</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <div>
                  <h3>{item.name}</h3>
                  <span>₹{item.price}</span>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => onDecrease(item.id)} type="button">−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onIncrease(item.id)} type="button">+</button>
                </div>
                <button className="text-button" onClick={() => onRemove(item.id)} type="button">
                  Remove
                </button>
              </article>
            ))}
          </div>
          <div className="cart-total">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>
        </>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <strong>BiteHouse</strong>
      <span>Simple React food menu lab project.</span>
    </footer>
  );
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);

  const visibleProducts = products.filter((product) => (
    selectedCategory === 'All' || product.category === selectedCategory
  ));

  function addToCart(product) {
    if (product.available === false) return;

    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        return items.map((item) => (
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      }

      return [...items, { ...product, quantity: 1 }];
    });
  }

  function increaseQuantity(id) {
    setCartItems((items) => items.map((item) => (
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )));
  }

  function decreaseQuantity(id) {
    setCartItems((items) => items
      .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
      .filter((item) => item.quantity > 0));
  }

  function removeItem(id) {
    setCartItems((items) => items.filter((item) => item.id !== id));
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar cartCount={cartCount} />
      <main className="page">
        <Hero />
        <CategoryButtons
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <FoodMenu items={visibleProducts} onAddToCart={addToCart} />
        <Cart
          cartItems={cartItems}
          onClear={() => setCartItems([])}
          onDecrease={decreaseQuantity}
          onIncrease={increaseQuantity}
          onRemove={removeItem}
        />
      </main>
      <Footer />
    </>
  );
}
