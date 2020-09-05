const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Blog, validateBlog } = require("../models/Blog");
const { User } = require("../models/User");

router.get("/", async (req, res) => {
  const blogs = await Blog.find().populate("user");
  res.json(blogs);
});

router.post("/", auth, async (req, res) => {
  console.log("entered");
  const { error } = validateBlog(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  req.body.likes = req.body.likes ? req.body.likes : 0;
  let blog = new Blog(req.body);

  const user = await User.findById(req.user.id);
  console.log(req.user);
  console.log(user);
  user.blogs = [...user.blogs, blog.id];
  await user.save();
  blog = await blog.save();

  res.json(blog);
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if (!blog)
    return res.status(400).send({ error: "no blogs with the given id" });

  if (!blog.user.toString() === req.user.id)
    return res.status(403).send({ error: "Access denied" });

  await Blog.findByIdAndRemove(blog._id);
  res.status(204).end();
});

module.exports = router;
