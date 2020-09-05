const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);
const { User } = require("../models/User");
const mongoose = require("mongoose");

describe("user", () => {
  beforeEach(async () => {
    const user = {
      username: "root root",
      password: "hellooo",
      name: "Rooott",
    };
    await api.post("/api/users").send(user);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });
  it("created with a existing user returns 400", async () => {
    const user = {
      username: "root root",
      password: "hellooo",
      name: "Rooott",
    };
    await api.post("/api/users").send(user).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
