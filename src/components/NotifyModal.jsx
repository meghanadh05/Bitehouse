import { useEffect, useState } from 'react';
import { isValidIndianPhone } from '../utils/storage.js';
import { hasNotificationRequest, saveNotificationRequest } from '../utils/notifications.js';

export default function NotifyModal({ product, onClose, onSaved }) {
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState('SMS');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanPhone = phone.trim();

    if (!isValidIndianPhone(cleanPhone)) {
      setError('Enter a valid 10-digit Indian phone number.');
      return;
    }

    if (hasNotificationRequest(product.id, cleanPhone)) {
      setError('A request already exists for this dish and phone number.');
      return;
    }

    saveNotificationRequest({
      productId: product.id,
      productName: product.name,
      phone: cleanPhone,
      method,
      createdAt: new Date().toISOString()
    });

    setError('');
    setSuccess(true);
    onSaved?.();
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="notify-modal" role="dialog" aria-modal="true" aria-labelledby="notify-title" onMouseDown={(e) => e.stopPropagation()}>
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Close modal">
          x
        </button>
        {success ? (
          <div className="modal-success">
            <h2 id="notify-title">You're on the list.</h2>
            <p>We'll notify you when this dish is available.</p>
            <button className="button primary" type="button" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 id="notify-title">Get notified when {product.name} is available</h2>
            <label className="field">
              Phone Number
              <input
                inputMode="numeric"
                maxLength="10"
                value={phone}
                onChange={(event) => setPhone(event.target.value.replace(/\D/g, ''))}
                placeholder="9876543210"
              />
            </label>
            <fieldset className="radio-group">
              <legend>How would you like to be notified?</legend>
              <label>
                <input
                  type="radio"
                  name="method"
                  checked={method === 'SMS'}
                  onChange={() => setMethod('SMS')}
                />
                SMS
              </label>
              <label>
                <input
                  type="radio"
                  name="method"
                  checked={method === 'Phone Call'}
                  onChange={() => setMethod('Phone Call')}
                />
                Phone Call
              </label>
            </fieldset>
            {error && <p className="form-error">{error}</p>}
            <button className="button primary full" type="submit">
              Notify Me
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
