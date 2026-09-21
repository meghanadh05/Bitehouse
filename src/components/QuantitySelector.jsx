export default function QuantitySelector({ quantity, min = 1, max, onChange }) {
  return (
    <div className="quantity-selector" aria-label="Quantity selector">
      <button type="button" onClick={() => onChange(quantity - 1)} disabled={quantity <= min}>
        -
      </button>
      <span>{quantity}</span>
      <button type="button" onClick={() => onChange(quantity + 1)} disabled={quantity >= max}>
        +
      </button>
    </div>
  );
}
