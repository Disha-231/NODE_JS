const user = require("../models/UserModel");

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userList = await user.create({
      name,
      email,
      password,
    });
    return res.status(200).send({
      success: true,
      message: "user created successfully",
      userList,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const viewUser = async (req, res) => {
  try {
    const userview = await user.find({});
    if (!userview) {
      return res.status(404).send({
        success: true,
        message: "Users found",
      });
    }
    return res.status(200).json(userview);
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log(req.query);
    let id = req.query.deleteid;
    await user.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log(req.body.id);
    const { id, name, email, password } = req.body;
    const updated = await user.findByIdAndUpdate(id, {
      name: name,
      email: email,
      password: password,
    });
    return res.status(200).send({
      success: true,
      message: "user updated successfully",
      updated,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

module.exports = {
  addUser,
  viewUser,
  deleteUser,
  updateUser,
};
