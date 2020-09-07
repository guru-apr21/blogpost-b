const express = require("express");
const router = express.Router();
const { validatelogIn, User } = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { error } = validatelogIn(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send({ error: "Invalid credentials" });

  const password = await bcrypt.compare(req.body.password, user.password);
  if (!password) return res.status(400).send({ error: "Invalid credentials" });

  console.log(user);
  const token = user.genAuthToken(user.name, user._id);
  res.send({ token, username: user.username, name: user.name });
});

module.exports = router;
