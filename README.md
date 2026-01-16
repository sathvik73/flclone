# Amazon Clone (MERN Stack)

A full-stack e-commerce application replicating Amazon's core functionality and design.

## Features
- **UI/UX**: Closely resembles Amazon's design (Dark header, White/Gray theme, Orange buttons).
- **Core Functionality**:
    - Product Listing (Search, Categories)
    - Product Details (Image stack, Buy Box)
    - Cart (Management with Qty updates)
    - Checkout (Shipping Address)
- **Tech Stack**:
    - Frontend: React, Vite, Tailwind CSS
    - Backend: Node.js, Express
    - Database: MySQL

## Setup & Run

### 1. Database
Ensure MySQL is running. The app tries to connect to `amazon_clone` database.
If not seeded automatically, run:
```bash
cd amazon/server
node seed.js
```

### 2. Backend
```bash
cd amazon/server
npm start
```
Runs on `http://localhost:5001`.

### 3. Frontend
```bash
cd amazon/client
npm run dev
```
Runs on `http://localhost:5173`.

## Deployment
See `vercel.json` for Vercel deployment configuration.
Set `DATABASE_URL` and `VITE_API_URL` environment variables in Vercel.
