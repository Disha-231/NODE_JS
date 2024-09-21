const express = require('express');

const routes = express.Router();

const { categoryPage, addCategory, insertCategory } = require('../controllers/CategoryController');

routes.get('/', categoryPage);
routes.get('/add', addCategory);
routes.post('/addCategory', insertCategory);

module.exports = routes;