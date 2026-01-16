const fs = require('fs');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const dbConfig = process.env.DATABASE_URL || {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    multipleStatements: true
};

async function seedDatabase() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to MySQL...');

        // Reuse schema but with Amazon data
        const schema = `
            CREATE DATABASE IF NOT EXISTS amazon_clone;
            USE amazon_clone;

            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                image_url TEXT
            );

            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                original_price DECIMAL(10, 2),
                discount_percentage INT,
                rating DECIMAL(2, 1) DEFAULT 0,
                review_count INT DEFAULT 0,
                stock INT DEFAULT 0,
                brand VARCHAR(100),
                category_id INT,
                image_url TEXT,
                is_prime BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES categories(id)
            );

            CREATE TABLE IF NOT EXISTS cart (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity INT DEFAULT 1,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (product_id) REFERENCES products(id),
                UNIQUE KEY unique_cart_item (user_id, product_id)
            );

            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                total_amount DECIMAL(10, 2) NOT NULL,
                status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
                shipping_address TEXT NOT NULL,
                payment_method VARCHAR(50) DEFAULT 'COD',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );

            CREATE TABLE IF NOT EXISTS order_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity INT NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                FOREIGN KEY (order_id) REFERENCES orders(id),
                FOREIGN KEY (product_id) REFERENCES products(id)
            );

            INSERT IGNORE INTO categories (id, name, image_url) VALUES 
            (1, 'Electronics', 'https://m.media-amazon.com/images/I/71SimpleImage.jpg'),
            (2, 'Books', 'https://m.media-amazon.com/images/I/71BookImage.jpg'),
            (3, 'Home', 'https://m.media-amazon.com/images/I/71HomeImage.jpg'),
            (4, 'Fashion', 'https://m.media-amazon.com/images/I/71FashionImage.jpg');

            INSERT IGNORE INTO products (title, description, price, original_price, discount_percentage, rating, review_count, stock, brand, category_id, image_url, is_prime) VALUES 
            ('Echo Dot (5th Gen) | Smart speaker with Alexa', 'Our best sounding Echo Dot yet – Enjoy an improved audio experience compared to any previous Echo Dot.', 5499, 6499, 15, 4.5, 12453, 100, 'Amazon', 1, 'https://m.media-amazon.com/images/I/61MbLLagiVL._AC_SY200_.jpg', TRUE),
            ('Apple iPhone 15 (128 GB) - Black', 'DYNAMIC ISLAND COMES TO IPHONE 15 — Dynamic Island bubbles up alerts and Live Activities.', 72999, 79900, 9, 4.6, 3421, 50, 'Apple', 1, 'https://m.media-amazon.com/images/I/71657TiFeHL._AC_UY327_FMwebp_QL65_.jpg', TRUE),
            ('Atomic Habits: The life-changing million copy bestseller', 'People think when you want to change your life, you need to think big. But world-renowned habits expert James Clear has discovered another way.', 550, 799, 31, 4.8, 56000, 200, 'Penguin', 2, 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UY327_FMwebp_QL65_.jpg', TRUE),
            ('Sony WH-1000XM5 Wireless Noise Cancelling Headphones', 'Industry Leading noise cancellation-two processors control 8 microphones for unprecedented noise cancellation.', 26990, 34990, 23, 4.4, 2100, 30, 'Sony', 1, 'https://m.media-amazon.com/images/I/61vJtBbkotL._AC_UY327_FMwebp_QL65_.jpg', TRUE);

            INSERT IGNORE INTO users (id, name, email, password) VALUES (1, 'Demo User', 'demo@amazon.com', 'password123');
        `;

        // Split schema by semicolon for multiple statements support if needed, 
        // but mysql2 multipleStatements=true handles it usually. 
        // However, standard mysql driver might iterate. 
        // For safety/simplicity let's rely on multipleStatements=true.

        await connection.query(schema);

        console.log('Database seeded successfully (Amazon)!');
        await connection.end();
    } catch (err) {
        console.error('Error seeding database:', err);
    }
}

seedDatabase();
