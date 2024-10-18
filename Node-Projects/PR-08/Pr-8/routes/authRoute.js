const express = require('express');

const routes = express.Router();
const passport = require('passport')

const { loginPage, registerPage, registerUser, loginUser, dashboardPage,logout } = require('../controllers/AuthController');

routes.get('/', loginPage);
routes.get('/register', registerPage);
routes.post('/registerUser', registerUser);
routes.post('/loginUser',passport.authenticate('local',{failureRedirect : '/'}) ,loginUser)
routes.get('/dashboard',passport.checkUser,dashboardPage)
routes.get('/logout',logout)

module.exports = routes;