import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products.js';
import { loadFromStorage, saveToStorage } from '../utils/storage.js';

const WishlistContext = createContext();
const WISHLIST_KEY = 'freshbasket_wishlist';

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState(() => loadFromStorage(WISHLIST_KEY, []));

  useEffect(() => {
    saveToStorage(WISHLIST_KEY, wishlistIds);
  }, [wishlistIds]);

  const toggleWishlist = (productId) => {
    setWishlistIds((ids) =>
      ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId]
    );
  };

  const removeFromWishlist = (productId) => {
    setWishlistIds((ids) => ids.filter((id) => id !== productId));
  };

  const isWishlisted = (productId) => wishlistIds.includes(productId);

  const wishlistProducts = useMemo(
    () => wishlistIds.map((id) => products.find((product) => product.id === id)).filter(Boolean),
    [wishlistIds]
  );

  return (
    <WishlistContext.Provider
      value={{ wishlistIds, wishlistProducts, toggleWishlist, removeFromWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
