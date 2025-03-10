const express= require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const schoolRouter=require('./routes/school.routes')
app.use(cors())
app.use(express.json())

app.use("/school",schoolRouter)
app.post('/',async (req,res)=>{
    res.send('sd');
})

module.exports = app;