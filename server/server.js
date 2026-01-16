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
let dbConfig;
if (process.env.DATABASE_URL) {
    dbConfig = process.env.DATABASE_URL;
} else {
    dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'amazon_clone'
    };
}

let connection;
let pool;

const initDb = async () => {
    try {
        if (!process.env.DATABASE_URL) {
            const tempConnection = await mysql.createConnection({
                host: dbConfig.host,
                user: dbConfig.user,
                password: dbConfig.password
            });
            await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
            await tempConnection.end();
        }

        if (process.env.DATABASE_URL) {
            connection = await mysql.createConnection(process.env.DATABASE_URL);
            pool = mysql.createPool(process.env.DATABASE_URL);
        } else {
            connection = await mysql.createConnection(dbConfig);
            pool = mysql.createPool(dbConfig);
        }

        console.log('Connected to MySQL database (Amazon)');
        app.locals.pool = pool;

    } catch (err) {
        console.error('Database connection failed:', err.message);
    }
};

initDb();

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
