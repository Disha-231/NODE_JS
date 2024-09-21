const express = require("express");

const app = express();

const port = 8080;

const connectDB = require("./config/db");
connectDB();


app.set('view engine', 'ejs');

const passport = require("passport")

const passportLocal = require("./config/passport-Local")

const session = require("express-session");

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }

}))

app.use(passport.initialize());

app.use(passport.session())

app.use(passport.setUser)

app.use(express.urlencoded())

app.use("/", require("./routes/indexRoute"));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server start :- ${port}`);
});
