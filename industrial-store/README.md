# Industrial Store

A premium industrial e-commerce frontend built with Vite, React, TypeScript, Tailwind CSS, Redux Toolkit and React Router. The project demonstrates a credible B2B storefront experience with product browsing, cart flow, auth UI, checkout and admin demo routes.

## Quick start

```bash
npm install
npm run dev
```

## Available scripts

```bash
npm run dev
npm run build
npm start
npm run preview
npm run lint
npm run typecheck
npm run test
```

## Server deployment

Build the frontend and start the preview server on the host:

```bash
npm ci
npm run build
npm start
```

The server listens on `PORT` when provided by the host, or port `4173` otherwise. Deployments should serve the built `dist` output through this server (or configure their static host to rewrite unknown routes to `index.html` for client-side routing).

## Demo-mode limitations

This is a frontend-only storefront demo. It does not connect to a real backend, payment provider, authentication service or inventory system. Registration, quote requests, password resets and checkout are clearly simulated and should be treated as UI-only flows.

## Project structure

- `src/app` – app bootstrap, providers and route configuration
- `src/components` – shared UI and layout components
- `src/features` – feature modules for home, products, auth, cart, checkout, quotes, admin and account
- `src/mocks` – demo product and catalog data
- `src/store` – Redux store and cart/wishlist slices
- `src/styles` – Tailwind entry and global styling

## Route overview

- `/` Home
- `/products` Product catalog
- `/products/:productId` Product detail
- `/categories/:categorySlug` Category page
- `/brands` Brand directory
- `/brands/:brandSlug` Brand page
- `/search` Search results
- `/about`, `/contact`, `/faq`, `/shipping`, `/returns`, `/privacy`, `/terms` informational pages
- `/request-quote` Quote request form
- `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-email` auth flows
- `/account` protected customer account
- `/cart` cart page
- `/checkout` checkout UI
- `/admin` demo admin dashboard

## Future backend integration

To connect this frontend to a real backend, the best next step is to add a REST or GraphQL API for:

- products and categories
- cart/session management
- customer authentication and session cookies
- order creation and payment verification
- admin inventory and quote management

Use secure HttpOnly session cookies, server-side validation and role enforcement on the backend. Never rely on client-side checks as the only protection for private routes or admin actions.
