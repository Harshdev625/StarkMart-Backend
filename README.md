# StarkMart Backend

This is the backend for StarkMart, a full-featured e-commerce platform. Built with Node.js, Express, and MongoDB, it provides RESTful APIs for authentication, product management, cart, orders, and Stripe payments.

---

## Features

- User authentication (JWT, Passport.js)
- Product, brand, and category management
- Shopping cart and order management
- Stripe payment integration
- Admin and user roles
- Email notifications (Nodemailer)

---

## Tech Stack

- Node.js, Express.js
- MongoDB, Mongoose
- Passport.js (JWT & Local strategies)
- Stripe API
- Nodemailer
- Vercel (deployment)

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Setup

1. Navigate to the backend folder:
   ```
   cd Backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   JWT_SECERT_KEY=your_jwt_secret
   SESSION_KEY=your_session_secret
   STRIPE_SERVER_KEY=your_stripe_secret_key
   ENDPOINT_SECERT=your_stripe_webhook_secret
   ```
4. Start the server:
   ```
   npm run dev
   ```
   The backend will run on `http://localhost:8080`.

---

## Scripts

- `npm start` — Start server
- `npm run dev` — Start server with nodemon

---

## Folder Structure

```
controllers/      # Route controllers (auth, product, order, etc.)
models/           # Mongoose models (User, Product, Order, etc.)
routes/           # Express routes
services/         # Common utilities (auth, sanitization, etc.)
index.js          # Main server file
package.json
vercel.json
```

---

## API Endpoints

- `/auth` — Authentication routes (register, login, logout, password reset)
- `/products` — Product CRUD and listing
- `/categories` — Category management
- `/brands` — Brand management
- `/cart` — Cart operations
- `/order` — Order placement and management
- `/user` — User profile and addresses
- `/create-payment-intent` — Stripe payment intent creation
- `/webhook` — Stripe webhook endpoint

---

## Deployment

- Backend is configured for deployment on Vercel (`vercel.json` included).

---

## License

This project is licensed under the ISC License.
