const UserModel = require('../models/UserModel');

var nodemailer = require('nodemailer');

const postEmail = async (req, res) => {
    try {
        let email = req.body.forgotemail;
        let user = await UserModel.findOne({ email: email });

        if (!user) {
            req.flash('error', "User not found")
            return res.redirect('/');
        }


        const otp = Math.floor(Math.random() * 1000000);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rwn3developer11@gmail.com',
                pass: 'qzvw zjil ejvj ppye'
            }
        });

        var mailOptions = {
            from: 'rwn3developer11@gmail.com',
            to: `${email}`,
            subject: 'Send Otp',
            html: `<h1>Hello ${user.name} Your Otp :- ${otp}</h1>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {

                console.log('Email sent: ' + info.response);
                let obj = {
                    email: email,
                    otp: otp
                }
                res.cookie('otp', obj)
                return res.redirect('/forgot/otp')
            }
        });

    } catch (err) {
        return false;
    }
}

const otpPage = (req, res) => {
    return res.render('otp');
}

const postOtp = async (req, res) => {
    try {
        let otp = req.body.otp;

        if (req.cookies.otp.otp == otp) {
            return res.redirect('/forgot/newpass')
        } else {
            req.flash('error', "Otp is Wrong");
            return res.redirect('/forgot/otp');
        }


    } catch (err) {
        console.log(err);
        return false;
    }
}
const newpass = (req, res) => {
    return res.render('newpassword');
}

const postNewPass = async (req, res) => {
    try {
        const { newpass, cpass } = req.body;
        let email = req.cookies.otp.email;
        if (newpass == cpass) {
            await UserModel.findOneAndUpdate({ email: email }, {
                password: newpass
            })
            res.clearCookie('otp');
            return res.redirect('/')
        } else {
            req.flash('error', "New and Confirm Password not match");
            return res.redirect('/forgot/newpass');
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    postEmail, otpPage, postOtp, newpass, postNewPass
}