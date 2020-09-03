const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.json(blog);
});

module.exports = router;
