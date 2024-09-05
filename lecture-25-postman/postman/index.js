const express = require("express");
const app = express();
const port = 8000;
const connectDB = require("./config/db");
connectDB();

app.use(express.urlencoded());

app.set("view engine", "ejs");

app.use("/api/v1", require("./routes/indexRoute"));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log(`server start :- ${port}`);
});
