const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  console.log(authorization);
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

module.exports = (req, res, next) => {
  const token = getTokenFrom(req);
  const decoded = jwt.verify(token, process.env.jwtPrivateKey);

  req.user = decoded;
  next();
};
