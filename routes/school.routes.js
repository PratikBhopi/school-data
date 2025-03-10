const express=require('express');
const { getSchoolsData, addSchoolData } = require('../controllers/school.controller');
const Router=express.Router();

Router.get('/list-schools',getSchoolsData);

Router.post('/add-school',addSchoolData);

module.exports=Router;