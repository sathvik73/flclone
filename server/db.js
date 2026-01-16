const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

let pool;

if (process.env.DATABASE_URL) {
    console.log('Connecting to remote MySQL...');
    const dbUrl = new URL(process.env.DATABASE_URL);
    const config = {
        host: dbUrl.hostname,
        user: dbUrl.username,
        password: dbUrl.password,
        database: dbUrl.pathname.slice(1),
        port: dbUrl.port ? parseInt(dbUrl.port) : 3306,
        ssl: {
            minVersion: 'TLSv1.2',
            rejectUnauthorized: true
        }
    };
    pool = mysql.createPool(config);
} else {
    pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'amazon_clone' // Changed DB name
    });
}

module.exports = pool;
