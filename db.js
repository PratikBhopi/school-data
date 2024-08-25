const mysql = require('mysql2/promise')
require('dotenv').config()

const mysqlpool = mysql.createPool({
    host:process.env.HOST,
    user:"root",
    password:process.env.DB_PASSWORD,
    database:'school_db'
})

module.exports = mysqlpool;