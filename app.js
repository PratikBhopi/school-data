const express= require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const schoolRouter=require('./routes/school.routes')
const { pool } = require('./db/db')
app.use(cors())
app.use(express.json())

app.use("/school",schoolRouter)
app.get('/',async (req,res)=>{
    const [rows]=await pool.query('SELECT * FROM schools')
    res.send('all schools: ',rows);
})

module.exports = app;