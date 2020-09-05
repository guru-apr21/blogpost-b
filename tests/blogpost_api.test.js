const initialBlogs = require("../tests/helper");
const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);
const Blog = require("../models/Blog");
const mongoose = require("mongoose");

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

afterEach(async () => {
  await Blog.deleteMany({});
});

test("get all blogs", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("if there is id in the returned object", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("create a new blog post", async () => {
  const newBlog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  };

  await api.post("/api/blogs").send(newBlog);

  const blogs = await api.get("/api/blogs");
  expect(blogs.body.length).toBe(initialBlogs.length + 1);
});

test("create a new blog post without likes initialized", async () => {
  const newBlog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  };

  const blog = await api.post("/api/blogs").send(newBlog);

  expect(blog.body.likes).toBe(0);
});

// test("create a new blog post without title and url initialized", async () => {
//   const newBlog = {
//     author: "Edsger W. Dijkstra",
//   };

//   const blog = await api.post("/api/blogs").send(newBlog).expect(400);
// });

afterAll(() => {
  mongoose.connection.close();
});
