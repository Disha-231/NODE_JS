const { escapeXML } = require('ejs');
const UserModel = require('../models/UserModel');

const loginPage = (req, res) => {
    return res.render('index')
}
const registerPage = (req, res) => {
    return res.render('register')
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body;
        await UserModel.create({
            name: name,
            email: email,
            password: password
        })
        req.flash('success', "User successfully register");
        return res.redirect('register')
    } catch (err) {
        console.log(err);
        return false;
    }
}
const loginUser = (req, res) => {
    return res.redirect('dashboard')
}
const dashboardPage = (req, res) => {
    return res.render('dashboard');
}
const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return false;
        }
        return res.redirect('/');
    })
}
module.exports = {
    loginPage, registerPage, registerUser, loginUser, dashboardPage, logout
}