
const UserModel = require('../models/authModel')

const LoginPage = (req, res) => {
    if (req.cookies['auth']) {
        return res.redirect('/dashboard')
    }

    return res.render('login');
}

const RegisterPage = (req, res) => {
    return res.render('register')
}


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    // console.log(req.body);
    UserModel.create({
        name: name,
        email: email,
        password: password
    });
    console.log("User Registered");

    return res.redirect('/');

}
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user || user.password != password) {
        console.log("Invalid Email or Password");
        return res.redirect('/');
    }
    res.cookie('auth', user)
    return res.redirect('/dashboard');

}
const DashboardPage = (req, res) => {
    if (!req.cookies['auth']) {
        return res.redirect('/');
    }
    return res.render('dashboard')
}
const Logout = async (req, res) => {
    res.clearCookie('auth');
    return res.redirect('/');
}
module.exports = {
    LoginPage, RegisterPage, DashboardPage, registerUser, loginUser, Logout
}