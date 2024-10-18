const express = require('express');

const routes = express.Router();

const { subcategoryPage , addSubcategoryPage } = require('../controllers/SubcategoryController');


routes.get('/', subcategoryPage);
routes.get('/add', addSubcategoryPage);

module.exports = routes;