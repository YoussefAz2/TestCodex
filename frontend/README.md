# QR Scan & Pay Frontend

This is the Next.js application for both the public customer flow and a lightweight admin panel. It consumes the existing backend API.

## Available Scripts

- `npm run dev` – start the dev server
- `npm run build` – build for production
- `npm start` – start the production server

## Project Structure

- `pages/` – app routes (public and admin)
- `components/` – shared React components (cart, layout, admin widgets)
- `styles/` – Tailwind CSS setup

The cart is stored locally using React context and `localStorage` so users can build an order without creating an account.

### Admin panel

The `/admin` routes provide a small interface for restaurant staff to manage menu items and settings. Authentication is simplified for now.
