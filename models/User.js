const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: { type: String, required: true },
  password: { type: String, required: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "blog" }],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

userSchema.methods.genAuthToken = (name, id) => {
  return jwt.sign({ name, id }, process.env.jwtPrivateKey);
};

const validateUser = (user) => {
  const schema = joi.object({
    username: joi.string().required().min(5),
    password: joi.string().required().min(5),
    name: joi.string().required().min(5).max(25),
  });
  return schema.validate(user);
};

const validatelogIn = (user) => {
  const schema = joi.object({
    username: joi.string().required().min(5),
    password: joi.string().required().min(5),
  });
  return schema.validate(user);
};

const User = mongoose.model("user", userSchema);

module.exports = { validateUser, User, validatelogIn };
