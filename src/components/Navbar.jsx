import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import SearchBar from './SearchBar.jsx';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const submitSearch = (event) => {
    event.preventDefault();
    const nextQuery = query.trim();
    navigate(nextQuery ? `/shop?search=${encodeURIComponent(nextQuery)}` : '/shop');
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="navbar">
        <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">BH</span>
          <span>
            <strong>BiteHouse</strong>
            <small>Good food. Made fresh.</small>
          </span>
        </Link>

        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <div className={`nav-content ${menuOpen ? 'open' : ''}`}>
          <div className="nav-links">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/shop" onClick={() => setMenuOpen(false)}>
              Menu
            </NavLink>
            <NavLink to="/categories" onClick={() => setMenuOpen(false)}>
              Categories
            </NavLink>
            <Link to="/#offers" onClick={() => setMenuOpen(false)}>Offers</Link>
          </div>

          <form className="nav-search" onSubmit={submitSearch}>
            <SearchBar value={query} onChange={setQuery} />
          </form>

          <NavLink className="wishlist-link" to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist</NavLink>

          <Link className="cart-link" to="/cart" onClick={() => setMenuOpen(false)} aria-label={`Cart with ${itemCount} items`}>
            Cart <span>{itemCount}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
