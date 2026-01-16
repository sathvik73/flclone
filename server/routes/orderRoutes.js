const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = require('../db');

// POST /api/orders - Place Order
router.post('/', async (req, res) => {
    const userId = 1; // Demo user
    const { shippingAddress, paymentMethod } = req.body;

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // 1. Get Cart Items
        const [cartItems] = await connection.query(
            'SELECT c.*, p.price FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?',
            [userId]
        );

        if (cartItems.length === 0) {
            await connection.rollback();
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // 2. Calculate Total
        const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        // 3. Create Order
        const [orderResult] = await connection.query(
            'INSERT INTO orders (user_id, total_amount, shipping_address, payment_method) VALUES (?, ?, ?, ?)',
            [userId, totalAmount, shippingAddress, paymentMethod || 'COD']
        );
        const orderId = orderResult.insertId;

        // 4. Create Order Items
        for (const item of cartItems) {
            await connection.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.product_id, item.quantity, item.price]
            );
        }

        // 5. Clear Cart
        await connection.query('DELETE FROM cart WHERE user_id = ?', [userId]);

        await connection.commit();
        res.json({ message: 'Order placed successfully', orderId });

    } catch (err) {
        if (connection) await connection.rollback();
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    } finally {
        if (connection) connection.release();
    }
});

module.exports = router;
