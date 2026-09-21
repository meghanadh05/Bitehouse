import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products.js';
import { loadFromStorage, saveToStorage } from '../utils/storage.js';

const CartContext = createContext();
const CART_KEY = 'freshbasket_cart';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => loadFromStorage(CART_KEY, []));

  useEffect(() => {
    saveToStorage(CART_KEY, cartItems);
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    if (!product || product.stock === 0) return { ok: false, message: 'Out of stock' };

    let result = { ok: true };
    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id);
      const currentQuantity = existing?.quantity || 0;
      const nextQuantity = Math.min(currentQuantity + quantity, product.stock);

      if (nextQuantity === currentQuantity) {
        result = { ok: false, message: `Only ${product.stock} available` };
        return items;
      }

      if (existing) {
        return items.map((item) => (item.id === product.id ? { ...item, quantity: nextQuantity } : item));
      }

      return [...items, { id: product.id, quantity: nextQuantity }];
    });
    return result;
  };

  const updateQuantity = (productId, quantity) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;

    setCartItems((items) => {
      if (quantity <= 0) {
        return items.filter((item) => item.id !== productId);
      }

      return items.map((item) =>
        item.id === productId ? { ...item, quantity: Math.min(quantity, product.stock) } : item
      );
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((items) => items.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const detailedItems = useMemo(
    () =>
      cartItems
        .map((item) => {
          const product = products.find((productItem) => productItem.id === item.id);
          return product ? { ...product, quantity: Math.min(item.quantity, product.stock) } : null;
        })
        .filter(Boolean),
    [cartItems]
  );

  const itemCount = detailedItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = detailedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const discount = subtotal >= 1000 ? 100 : subtotal >= 500 ? 50 : 0;
  const total = Math.max(subtotal + deliveryFee - discount, 0);

  const value = {
    cartItems: detailedItems,
    itemCount,
    subtotal,
    deliveryFee,
    discount,
    total,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
