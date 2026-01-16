const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = require('../db');

// GET /api/cart - Get cart for a user (Assuming dummy user ID 1 for now if no auth)
router.get('/', async (req, res) => {
    // In real app, get user ID from token
    const userId = 1;

    try {
        const query = `
            SELECT c.id as cart_item_id, c.quantity, p.* 
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ?
        `;
        const [rows] = await pool.query(query, [userId]);

        let totalAmount = 0;
        let totalDiscount = 0;
        // Calculate totals on backend for display safety, though frontend often recalculates
        rows.forEach(item => {
            totalAmount += item.price * item.quantity;
            // logic for discount if original_price exists
        });

        res.json({ items: rows, totalAmount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/cart - Add item
router.post('/', async (req, res) => {
    const userId = 1;
    const { productId, quantity } = req.body;

    try {
        // Check if item exists
        const [exists] = await pool.query('SELECT * FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId]);

        if (exists.length > 0) {
            // Update quantity
            await pool.query('UPDATE cart SET quantity = quantity + ? WHERE id = ?', [quantity || 1, exists[0].id]);
        } else {
            // Insert new
            await pool.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)', [userId, productId, quantity || 1]);
        }
        res.json({ message: 'Item added to cart' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// PUT /api/cart/:id - Update quantity
router.put('/:id', async (req, res) => {
    const { quantity } = req.body;
    try {
        await pool.query('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, req.params.id]);
        res.json({ message: 'Cart updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE /api/cart/:id - Remove item
router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM cart WHERE id = ?', [req.params.id]);
        res.json({ message: 'Item removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
