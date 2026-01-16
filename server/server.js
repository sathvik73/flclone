const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001; // Use 5001 to avoid conflict if both running

// Middleware
app.use(cors());
app.use(express.json());

// Database Init
// Database Connection handled in db.js used by routes

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        db: app.locals.pool ? 'connected' : 'disconnected',
        env: {
            hasUrl: !!process.env.DATABASE_URL,
            host: process.env.DB_HOST
        }
    });
});

app.get('/', (req, res) => {
    res.send('Amazon Clone API is running');
});

// Import Routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
    console.log(`Amazon Server running on port ${PORT}`);
});

module.exports = app;
