const express = require('express');
const { LoginPage, RegisterPage, registerUser, DashboardPage, loginuser, logOut } = require('../controller/authController');
const passport = require('passport');

const routes = express.Router();


routes.get('/', LoginPage);
routes.get('/register', RegisterPage);
routes.post('/registerUser', registerUser);
routes.post('/loginuser', passport.authenticate('local', { failureRedirect: '/' }), loginuser);
routes.get('/dash', passport.checkUser, DashboardPage);
routes.get('/logOut', logOut)

module.exports = routes;
