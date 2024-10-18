const express = require('express');

const port = 9800;

const app = express();

const path = require('path');

const db = require('./config/db');

app.set('view engine', 'ejs');

const flash = require('connect-flash');

const cookieParser = require('cookie-parser');

const passport = require('passport');
const passportLocal = require('./config/passportStrategy');
const session = require('express-session');
app.use(session({
    secret: 'admin',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);

app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded());

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', require('./routes/indexRoute'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log(`server is start on port :- ${port}`);

})