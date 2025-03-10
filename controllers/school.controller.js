const pool=require('../db/db')


exports.getSchoolsData=async(req,res)=>{
    const { latitude, longitude } = req.query || req.body;
    try{
        if (!latitude || !longitude) {
            return res.status(400).json({ error: "Latitude and Longitude are required" });
        }
        const [schools]=await pool.execute(`
            SELECT id, name, address, latitude, longitude,
            (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(latitude)) * 
            COS(RADIANS(longitude) - RADIANS(?)) + SIN(RADIANS(?)) * SIN(RADIANS(latitude))))
            AS distance
            FROM schools
            ORDER BY distance ASC`,[latitude,longitude,latitude]);
        return res.status(200).json({success:true,schools:schools});
    }catch(error){
        return res.status(404).json({success:false,error:error})
    }
}




exports.addSchoolData=async(req,res)=>{
    const{name,address,latitude,longitude}=req.body;
    if(name==""||address==""||latitude==""|| longitude==""){
        return res.status(400).json({success:false,error:"Invalid Data"});
    }
    const newName=String(name).toLocaleLowerCase(),newAddress=String(address).toLowerCase();
    try{
        const [existing] = await pool.execute(
            `SELECT 1 FROM schools WHERE name = ? AND address= ? LIMIT 1`, 
            [newName,newAddress]
        );

        if (existing.length > 0) {
            return res.status(400).json({ success: false, message: "School already exists!" });
        }
        await pool.execute(`
            INSERT INTO schools (name,address,latitude,longitude) values(?,?,?,?)`,
            [newName,newAddress,latitude,longitude]);

        return res.status(200).json({success:true,message:'Created'})
    }catch(error){
        return res.status(404).json({error:error})
    }
}