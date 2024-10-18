const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dishavaghasiya2311:dishavaghasiya2311@cluster0.ifmvo.mongodb.net/api-ADMIN-pr-08"
    );
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    return false;
  }
};

module.exports = connectDB;
