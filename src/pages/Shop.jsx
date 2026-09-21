import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryFilter from '../components/CategoryFilter.jsx';
import EmptyState from '../components/EmptyState.jsx';
import NotifyModal from '../components/NotifyModal.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { products } from '../data/products.js';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [maxPrice, setMaxPrice] = useState(600);
  const [sort, setSort] = useState('Recommended');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [foodType, setFoodType] = useState('All');
  const [notifyProduct, setNotifyProduct] = useState(null);
  const [, setNotificationVersion] = useState(0);

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setCategory(searchParams.get('category') || 'All');
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const searchText = search.toLowerCase();
    const result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText);
      const matchesCategory = category === 'All' || product.category === category;
      const matchesPrice = product.price <= maxPrice;
      const matchesStock = !inStockOnly || product.stock > 0;
      const matchesFoodType = foodType === 'All' || (foodType === 'Veg' ? product.veg : !product.veg);
      return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesFoodType;
    });

    return result.sort((a, b) => {
      if (sort === 'Price: Low to High') return a.price - b.price;
      if (sort === 'Price: High to Low') return b.price - a.price;
      if (sort === 'Rating') return b.rating - a.rating;
      return b.stock - a.stock || b.rating - a.rating;
    });
  }, [category, foodType, inStockOnly, maxPrice, search, sort]);

  return (
    <div className="page">
      <section className="shop-header">
        <div>
          <p className="eyebrow">BiteHouse Menu</p>
          <h1>What are you craving?</h1>
          <p>{filteredProducts.length} dishes</p>
        </div>
        <SearchBar value={search} onChange={setSearch} />
      </section>

      <section className="shop-layout">
        <aside className="filters-panel">
          <h2>Filters</h2>
          <CategoryFilter selectedCategory={category} onChange={setCategory} />
          <div className="food-type-filter" role="group" aria-label="Veg or non-veg filter">{['All', 'Veg', 'Non-Veg'].map((type) => <button type="button" key={type} className={foodType === type ? 'active' : ''} onClick={() => setFoodType(type)}>{type}</button>)}</div>
          <label className="field">
            Price up to ₹{maxPrice}
            <input type="range" min="90" max="600" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
          </label>
          <label className="checkbox-field">
            <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
            Show only available dishes
          </label>
          <label className="field">
            Sort
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </label>
        </aside>

        <div className="shop-results">
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} onNotify={setNotifyProduct} />
          ) : (
            <EmptyState title="No dishes found" message="Try a different search, category, or price range." />
          )}
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
