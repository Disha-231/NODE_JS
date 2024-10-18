const express = require('express');

const routes = express.Router();

const { exsubcategoryPage , addExSubcategoryPage } = require('../controllers/ExSubCategoryController');


routes.get('/', exsubcategoryPage);
routes.get('/add', addExSubcategoryPage);

module.exports = routes;