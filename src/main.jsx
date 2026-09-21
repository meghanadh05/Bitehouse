import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { OrderProvider } from './context/OrderContext.jsx';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <OrderProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </OrderProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
