const express=require('express');
const { getSchoolsData, addSchoolData } = require('../controllers/school.controller');
const Router=express.Router();

Router.get('/listSchools',getSchoolsData);

Router.post('/addSchool',addSchoolData);

module.exports=Router;