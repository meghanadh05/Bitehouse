export default function SearchBar({ value, onChange, placeholder = 'Search dishes...' }) {
  return (
    <label className="search-bar">
      <span className="sr-only">Search</span>
      <span aria-hidden="true">⌕</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}
