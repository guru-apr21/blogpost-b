require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/error");
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");
const loginRouter = require("./routes/login");
require("./db")();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Listening on ${PORT}`));
app.use(errorHandler);
module.exports = app;
