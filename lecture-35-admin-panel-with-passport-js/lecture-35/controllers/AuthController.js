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

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            req.flash('error', "User with this email already exists");
            return res.redirect('/'); // Redirect back to the register page
        }

        // If the passwords do not match, return an error
        if (password !== cpassword) {
            req.flash('error', "Passwords do not match");
            return res.redirect('/'); // Redirect back to the register page
        }

        // Create new user
        await UserModel.create({
            name: name,
            email: email,
            password: password
        });

        req.flash('success', "User successfully registered");
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        req.flash('error', "An error occurred. Please try again.");
        return res.redirect('/register');
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