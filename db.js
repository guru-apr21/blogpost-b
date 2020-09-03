const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  const url = process.env.MONGO_URI;
  console.log(url);
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.log("Couldn't connect to the database"));
};

module.exports = connectDB;
