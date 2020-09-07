const mongoose = require("mongoose");
const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const validateBlog = (blog) => {
  const schema = joi.object({
    title: joi.string().required().min(5),
    author: joi.string().required().min(5).max(25),
    url: joi.string().required(),
    likes: joi.number(),
    // user: joi.objectId().required(),
  });
  return schema.validate(blog);
};

const Blog = mongoose.model("blog", blogSchema);

module.exports = { Blog, validateBlog };
