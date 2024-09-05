const express = require('express')

const routes = express.Router();

const crudController = require('../controllers/CrudController')

routes.get('/', crudController.ViewUser);
routes.get('/add', crudController.AddUser)
routes.post('/insertRecord', crudController.insertRecord);
routes.get('/view', crudController.ViewUser);
routes.get('/deleteRecord', crudController.deleteRecord)
routes.get('/editRecord', crudController.editRecord);
routes.post('/updateRecord', crudController.updateRecord);


module.exports = routes


