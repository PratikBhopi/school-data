const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
    waitForConnections: true,
    connectionLimit: 10,
    ssl:{ca: Buffer.from(process.env.DB_SSL_CERT_BASE64, "base64").toString()}
});

module.exports = pool;
