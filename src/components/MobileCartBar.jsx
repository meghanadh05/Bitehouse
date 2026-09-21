import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { formatCurrency } from '../utils/storage.js';

export default function MobileCartBar() {
  const { itemCount, subtotal } = useCart();
  if (!itemCount) return null;
  return <Link className="mobile-cart-bar" to="/cart"><span>{itemCount} {itemCount === 1 ? 'item' : 'items'} · {formatCurrency(subtotal)}</span><strong>View Cart →</strong></Link>;
}
