const express= require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const schoolRouter=require('./routes/school.routes')
app.use(cors())
app.use(express.json())

app.use("/school",schoolRouter)
app.post('/',async (req,res)=>{

    const [rows]=await pool.execute('SELECT * FROM schools');
    console.log(rows)
    res.send('sd');
    // const {name}=req.body;
    // console.log(String(name).toLowerCase());
    // try{
    //     const schoolExist=await pool.execute(`
    //         SELECT * 
    //         FROM schools
    //         WHERE name=?`,[name])
    //     console.log(schoolExist);
    //     return res.status(200).json({success:true,message:'Created'})
    // }catch(error){
    //     return res.status(404).json({error:error})
    // }

})

module.exports = app;