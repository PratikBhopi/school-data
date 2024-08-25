const express = require('express');
const db = require('../db');  //giving unique name to pool


const allroutes = express.Router()

allroutes.post("/addSchool",async(req,res)=>{
    const {name,address,latitude,longitude} = req.body
    if(name==""||address==""||latitude==""|| longitude=="") return res.send({success:false,message:"Please Provide all fields"})
    try {
        // console.log(name,address,latitude,longitude);
        const data = await db.query('INSERT INTO schools (name, address,latitude,longitude) VALUES (?, ?, ?, ?)',[name,address,latitude,longitude]);
        if(!data){
            return res.status(404).send({
                success:false,
                message:"Error in inserting."
            })
        } 
        
        return res.status(201).send({success:true,message:"New School data added."})

    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:"Error in creating record."})
    }

})
allroutes.get("/",async (req,res)=>{
    res.send("HELLO everythign is fine")
})

// {
//     "name":"pratik",
//     "address":"pune",
//     "latitude":"3.25.87",
//     "longitude":"3.55"
//   }

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function haversineDistance(lat1, lon1, lat2, lon2) {

    const R = 6371e3; // Earth's radius in meters
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // Distance in meters
    console.log(d/1000)
    return d;
}




allroutes.get("/listSchools",async(req,res)=>{
    const {latitude,longitude} = req.body;
    try {

        const [rows] = await db.query('SELECT * FROM schools ORDER BY latitude');
        
        const data=rows.sort(row=>haversineDistance(row.latitude,row.longitude,latitude,longitude))
        // console.log(data)

        if (rows.length === 0) {
            return res.status(404).send({ success:true,message: "No records found." });
        }

        res.status(200).send({success:true, message: "All schools records:", data: rows });
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).send({success:false, message: "An error occurred while fetching records." });
    }
})

module.exports = allroutes