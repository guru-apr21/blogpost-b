module.exports = (err, req, res, next) => {
  console.error(err.message);
  console.log(err.name);
  if (err.name === "JsonWebTokenError")
    return res
      .status(401)
      .send({ error: "Invalid token authorization denied" });
  res.status(500).send({ error: "Something failed" });
};
