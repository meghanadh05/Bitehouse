import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useOrder } from '../context/OrderContext.jsx';
import OrderTypeSelector from '../components/OrderTypeSelector.jsx';
import { formatCurrency, isValidIndianPhone } from '../utils/storage.js';

export default function Checkout() {
  const { cartItems, subtotal, deliveryFee, discount, clearCart } = useCart();
  const { orderType, tableNumber } = useOrder();
  const [form, setForm] = useState({ fullName: '', phone: '', payment: 'Cash' });
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState('');
  const taxes = Math.round(subtotal * 0.05);
  const packaging = orderType === 'Takeaway' ? deliveryFee : 0;
  const payableTotal = subtotal + taxes + packaging - discount;

  if (cartItems.length === 0 && !orderId) return <Navigate to="/cart" replace />;
  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const placeOrder = (event) => {
    event.preventDefault();
    if (orderType === 'Takeaway' && (!form.fullName.trim() || !form.phone.trim())) return setError('Please enter your name and phone number.');
    if (orderType === 'Takeaway' && !isValidIndianPhone(form.phone)) return setError('Enter a valid 10-digit Indian phone number.');
    setOrderId(`BH-${Math.floor(10000 + Math.random() * 90000)}`);
    clearCart();
  };

  if (orderId) return <div className="page"><section className="success-panel"><span className="success-check">✓</span><p className="eyebrow">Order Confirmed!</p><h1>{orderId}</h1><p>{orderType === 'Dine In' ? `Your order will be served at Table ${tableNumber}.` : "We'll let you know when your order is ready."}</p><p><strong>Estimated preparation:</strong> 20–25 minutes</p><Link className="button primary" to="/shop">Back to Menu</Link></section></div>;

  return <div className="page"><section className="checkout-layout"><form className="checkout-form" onSubmit={placeOrder}><p className="eyebrow">Checkout</p><h1>Complete Your Order</h1><OrderTypeSelector compact />{orderType === 'Takeaway' && <><label className="field">Name<input value={form.fullName} onChange={(e) => updateField('fullName', e.target.value)} /></label><label className="field">Phone Number<input inputMode="numeric" maxLength="10" value={form.phone} onChange={(e) => updateField('phone', e.target.value.replace(/\D/g, ''))} /></label></>}{orderType === 'Dine In' && <p className="checkout-table">Your order will be served at <strong>Table {tableNumber}</strong>.</p>}<fieldset className="radio-group"><legend>Payment</legend>{['Cash', 'UPI', 'Card'].map((payment) => <label key={payment}><input type="radio" name="payment" checked={form.payment === payment} onChange={() => updateField('payment', payment)} />{payment}</label>)}</fieldset>{error && <p className="form-error">{error}</p>}<button className="button primary full" type="submit">Place Order · {formatCurrency(payableTotal)}</button></form><aside className="summary-panel"><h2>Order summary</h2><div className="summary-row"><span>Item Total</span><strong>{formatCurrency(subtotal)}</strong></div><div className="summary-row"><span>Taxes</span><strong>{formatCurrency(taxes)}</strong></div>{orderType === 'Takeaway' && <div className="summary-row"><span>Packaging</span><strong>{formatCurrency(packaging)}</strong></div>}<div className="summary-row"><span>Discount</span><strong>-{formatCurrency(discount)}</strong></div><div className="summary-total"><span>Total</span><strong>{formatCurrency(payableTotal)}</strong></div></aside></section></div>;
}
