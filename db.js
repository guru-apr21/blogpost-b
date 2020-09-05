const mongoose = require("mongoose");
const config = require("config");

const connectDB = () => {
  const url = config.get("db");
  console.log(url);
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.log("Couldn't connect to the database"));
};

module.exports = connectDB;
