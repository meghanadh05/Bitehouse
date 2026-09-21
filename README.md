# BiteHouse

BiteHouse is a simple one-page React food menu project. It is built as a clean lab project to demonstrate core React concepts without extra features or backend setup.

## Features

- One-page restaurant menu website
- Navbar with Home, Menu, and cart count
- Small hero section with View Menu, Call, and Message buttons
- Category buttons for All, Burgers, Pizza, Biryani, and Drinks
- 12 food items with local images and prices
- Unavailable label for selected menu items
- Add to Cart button for every item, disabled when unavailable
- Cart with item quantity controls, remove button, total, and clear cart
- Responsive burgundy and cream BiteHouse design

## React Concepts Used

- Components
- Props
- `useState`
- `map()`
- `filter()`
- Event handling
- Conditional rendering

## Not Included

This project intentionally keeps the code simple. It does not use:

- React Router
- Search
- Wishlist
- Checkout
- Login
- localStorage
- Backend or API
- Payment integration

## Project Structure

```text
src/
├── App.jsx
├── main.jsx
├── data/
│   └── products.js
├── styles/
│   └── global.css
└── assets/
    └── food/
```

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Deploy

For Netlify:

- Build command: `npm run build`
- Publish directory: `dist`

The project is frontend-only and does not require environment variables.
