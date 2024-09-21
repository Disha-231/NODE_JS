const express = require("express");
const {
  addUser,
  viewUser,
  deleteUser,
  updateUser,
} = require("../controllers/authController");
const routes = express.Router();

// const ac = require("../controllers/authController");

routes.post("/addUser", addUser);
routes.get("/viewUser", viewUser);
routes.delete("/deleteUser", deleteUser);
routes.put("/updateUser", updateUser);

module.exports = routes;
