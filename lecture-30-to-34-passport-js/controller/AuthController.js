const UserModel = require('../models/UserModel')

const LoginPage = (req, res) => {
    if (res.locals.users) {
        return res.redirect('/dash')
    }
    return res.render('login');
}

const RegisterPage = (req, res) => {
    return res.render('register');
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        await UserModel.create({
            name: name,
            email: email,
            password: password

        })
        console.log("User registered");
        return res.redirect('/'); // Redirect to login page or dashboard
    } catch (err) {
        console.log(err);
        return false
    }
}

function loginuser(req, res) {
    res.render('dashboard');  // This will render `views/dash.ejs`
}

const DashboardPage = (req, res) => {
    return res.render("dashboard");
}
const logOut = (req, res) => {
    req.logOut((err) => {
        if (err) {
            console.log(err);
            return false
        }
        return res.redirect("/")
    })
}

module.exports = {
    LoginPage,
    RegisterPage,
    registerUser,
    DashboardPage,
    loginuser,
    logOut
}
