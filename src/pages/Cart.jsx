import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatCurrency } from '../utils/storage.js';
import { useOrder } from '../context/OrderContext.jsx';
import OrderTypeSelector from '../components/OrderTypeSelector.jsx';

export default function Cart() {
  const { cartItems, subtotal, deliveryFee, discount, updateQuantity, removeFromCart } = useCart();
  const { orderType, tableNumber } = useOrder();
  const packaging = orderType === 'Takeaway' ? deliveryFee : 0;
  const taxes = Math.round(subtotal * 0.05);
  const payableTotal = subtotal + taxes + packaging - discount;

  if (cartItems.length === 0) {
    return <EmptyState title="Your order is empty" message="Add a dish from the menu to get started." />;
  }

  return (
    <div className="page">
      <section className="section-heading page-heading">
        <div>
          <p className="eyebrow">Your Order</p>
          <h1>Review your order</h1>
        </div>
      </section>

      <section className="cart-layout">
        <div className="cart-list">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <strong>{item.name}</strong>
                <span>{item.unit}</span>
                <span>{formatCurrency(item.price)}</span>
              </div>
              <div className="cart-controls">
                <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock}>
                  +
                </button>
              </div>
              <button className="text-button" type="button" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </article>
          ))}
        </div>

        <aside className="summary-panel">
          <h2>Order details</h2>
          <OrderTypeSelector compact />
          <p className="order-detail"><strong>Order Type:</strong> {orderType}{orderType === 'Dine In' && <> · Table {tableNumber}</>}</p>
          <div className="summary-row">
            <span>Item Total</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Taxes</span>
            <strong>{formatCurrency(taxes)}</strong>
          </div>
          {orderType === 'Takeaway' && <div className="summary-row"><span>Packaging</span><strong>{formatCurrency(packaging)}</strong></div>}
          <div className="summary-row">
            <span>Discount</span>
            <strong>-{formatCurrency(discount)}</strong>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <strong>{formatCurrency(payableTotal)}</strong>
          </div>
          <Link className="button primary full" to="/checkout">
            Continue to Checkout
          </Link>
        </aside>
      </section>
    </div>
  );
}
