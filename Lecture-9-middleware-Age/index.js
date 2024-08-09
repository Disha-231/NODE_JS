const express = require("express");

const port = 8000;
const app = express();
app.set("view engine", "ejs");

const checkAge = (req, res, next) => {
  console.log("middleware is running");
  let age = req.query.age;
  console.log(age);
  if (!age || age < 18) {
    return res.redirect("/");
  }
  return next();
};

app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/dash", checkAge, (req, res) => {
  return res.render("dasboard");
});

app.get("/product", checkAge, (req, res) => {
  return res.render("product");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log(`server is start on port ${port}`);
});
