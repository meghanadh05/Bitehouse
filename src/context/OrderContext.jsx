import { createContext, useContext, useEffect, useState } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage.js';

const OrderContext = createContext();
const ORDER_TYPE_KEY = 'bitehouse_order_type';
const TABLE_KEY = 'bitehouse_table';

export function OrderProvider({ children }) {
  const [orderType, setOrderType] = useState(() => loadFromStorage(ORDER_TYPE_KEY, 'Takeaway'));
  const [tableNumber, setTableNumber] = useState(() => loadFromStorage(TABLE_KEY, '1'));
  useEffect(() => saveToStorage(ORDER_TYPE_KEY, orderType), [orderType]);
  useEffect(() => saveToStorage(TABLE_KEY, tableNumber), [tableNumber]);
  return <OrderContext.Provider value={{ orderType, setOrderType, tableNumber, setTableNumber }}>{children}</OrderContext.Provider>;
}

export function useOrder() { return useContext(OrderContext); }
