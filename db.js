const mysql = require('mysql2/promise')
require('dotenv').config()

const mysqlpool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:process.env.DB_PASSWORD,
    database:'school_db'
})

module.exports = mysqlpool;