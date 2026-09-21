import { categories } from '../data/products.js';

export default function CategoryFilter({ selectedCategory, onChange }) {
  return (
    <div className="category-filter" aria-label="Food category filter">
      <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => onChange('All')}>
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? 'active' : ''}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
