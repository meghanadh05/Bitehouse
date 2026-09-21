# BiteHouse

BiteHouse is a React-only restaurant ordering website for dine-in and takeaway orders. It uses local menu data, React Router, localStorage persistence, and a Netlify-ready setup.

## Features

- Home, menu, categories, dish details, wishlist, cart, and checkout routes
- 30 restaurant dishes with INR pricing, ratings, availability, and food photography
- Search, category, price, availability, sorting, and veg/non-veg filters
- Persistent cart, wishlist, order type, and dine-in table selection
- Stock-aware quantity controls and notification requests for unavailable dishes
- Indian phone validation and duplicate notification prevention
- Takeaway and dine-in checkout with mock Cash, UPI, and Card payment options
- Responsive layout with a mobile sticky cart bar

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Deploy on Netlify

Use `npm run build` as the build command and `dist` as the publish directory. The included `public/_redirects` file supports React Router routes on refresh.
