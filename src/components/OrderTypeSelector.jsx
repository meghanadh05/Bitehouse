import { useOrder } from '../context/OrderContext.jsx';

export default function OrderTypeSelector({ compact = false }) {
  const { orderType, setOrderType, tableNumber, setTableNumber } = useOrder();
  return (
    <div className={`order-type-control ${compact ? 'compact' : ''}`}>
      {!compact && <h2>How would you like your order?</h2>}
      <div className="order-type-buttons" role="group" aria-label="Order type">
        {['Dine In', 'Takeaway'].map((type) => <button key={type} type="button" className={orderType === type ? 'active' : ''} onClick={() => setOrderType(type)}>{type}</button>)}
      </div>
      {orderType === 'Dine In' && <label className="table-selector">Table<select value={tableNumber} onChange={(event) => setTableNumber(event.target.value)}>{Array.from({ length: 15 }, (_, index) => index + 1).map((table) => <option key={table} value={table}>Table {table}</option>)}</select></label>}
    </div>
  );
}
