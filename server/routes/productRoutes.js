const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = require('../db');

// GET /api/products - Get all products with filters
router.get('/', async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice } = req.query;
        let query = 'SELECT * FROM products WHERE 1=1';
        const params = [];

        if (search) {
            query += ' AND (title LIKE ? OR description LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        if (category) {
            // Assuming category is passed by ID or join logic. For simplicity, filtering by category_id if numeric
            // or we'd need a join. Let's assume category ID for now.
            query += ' AND category_id = ?';
            params.push(category);
        }

        if (minPrice) {
            query += ' AND price >= ?';
            params.push(minPrice);
        }

        if (maxPrice) {
            query += ' AND price <= ?';
            params.push(maxPrice);
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
