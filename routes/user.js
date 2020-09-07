const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { validateUser, User } = require("../models/User");

router.get("/", async (req, res) => {
  const users = await User.find().sort("username").populate("blogs");
  res.json(users);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const duplicate = await User.findOne({ username: req.body.username });
  if (duplicate) return res.status(400).send({ error: "User already exists" });

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  let user = new User({
    username: req.body.username,
    name: req.body.name,
    password,
  });

  user = await user.save();
  const token = user.genAuthToken(user.username, user.id);
  res.json({ username: user.username, id: user.id, token });
});

module.exports = router;
