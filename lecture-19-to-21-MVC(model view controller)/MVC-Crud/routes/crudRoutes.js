const express = require('express')
const {viewPage,addPage,addRecord}=require('../controllers/crudController')
const routes=express.routes()
routes.get('/',viewPage)
routes.get('/add',addPage)
routes.post('/insertRecord',addRecord)
module.exports=routes