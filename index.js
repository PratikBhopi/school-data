const express= require('express')
require('dotenv').config()
const port = process.env.PORT||3000;
const cors = require('cors')
const bodyparser = require('body-parser')

const allroutes = require('./routes/allroutes');
const mysqlpool = require('./db');

const app = express()
app.use(cors())
app.use(bodyparser.json())

app.use("/",allroutes)

mysqlpool.query('SELECT 1').then(()=>{
    app.listen(port,()=>{
        console.log("app running on port: ",port);
        console.log("connected to database.")
    })
})
.catch((error)=>{
    console.log(error)
})