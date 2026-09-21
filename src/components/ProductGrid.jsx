import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products, onNotify }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onNotify={onNotify} />
      ))}
    </div>
  );
}
