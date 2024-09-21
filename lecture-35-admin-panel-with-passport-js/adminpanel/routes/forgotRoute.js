const express = require('express');

const routes = express.Router();

const { postEmail, otpPage, postOtp, newpass, postNewPass } = require('../controllers/ForgotController');


routes.post('/postEmail', postEmail)
routes.get('/otp', otpPage);
routes.post('/postOtp', postOtp);
routes.get('/newpass', newpass);
routes.post('/postNewPass', postNewPass);

module.exports = routes;