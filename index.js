const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./routes/blog");
require("./db")();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
