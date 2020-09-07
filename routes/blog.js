const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Blog, validateBlog } = require("../models/Blog");
const { User } = require("../models/User");

router.get("/", async (req, res) => {
  const blogs = await Blog.find().populate("user").sort("likes");
  res.json(blogs);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateBlog(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  req.body.likes = req.body.likes ? req.body.likes : 0;
  let blog = new Blog(req.body);

  const user = await User.findById(req.user.id);
  user.blogs = [...user.blogs, blog.id];
  await user.save();

  blog.user = req.user.id;
  blog = await blog.save();

  res.json(blog);
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if (!blog)
    return res.status(400).send({ error: "no blogs with the given id" });

  console.log(blog.user.toString() === req.user.id);
  console.log(typeof blog.user, blog.user);
  console.log(typeof req.user.id, req.user.id);

  if (!(blog.user.toString() === req.user.id))
    return res.status(403).send({ error: "Access denied" });

  const user = await User.findById(req.user.id);
  user.blogs = user.blogs.filter((b) => b !== id);
  await user.save();
  await Blog.findByIdAndRemove(blog._id);
  res.status(204).end();
});

router.put("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const data = await Blog.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true }
  )
    .populate("user")
    .sort("likes");
  res.json(data);
});

module.exports = router;
