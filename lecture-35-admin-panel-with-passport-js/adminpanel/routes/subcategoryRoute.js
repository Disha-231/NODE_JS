const express = require('express');

const routes = express.Router();

const { subcategoryPage } = require('../controllers/SubcategoryController');


routes.get('/', subcategoryPage);

module.exports = routes;