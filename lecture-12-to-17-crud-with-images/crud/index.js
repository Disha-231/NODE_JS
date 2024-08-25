const express = require('express')
const port = 8080;
const app = express();

//connection database mongodb
const connectDB = require("./config/db")
connectDB();
app.use(express.urlencoded())

const UserModel = require('./models/UserModel')

app.set("view engine", "ejs")

app.get("/add", (req, res) => {
    return res.render("Form")
})

app.get("/", (req, res) => {
    UserModel.find({})
        .then((record) => {
            return res.render("table", {
                record,
            });
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
});

app.post('/insertRecord', (req, res) => {
    // console.log(req.body);
    const { name, email, password } = req.body;
    UserModel.create({
        name: name,
        email: email,
        password: password,
    })
        .then((data) => {
            console.log("Record Add sucessfully");
            return res.redirect("/")
        }).catch((err) => {
            console.log(err);
            return false;
        })
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is start on port :-${port}`);
})