const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(403).send({ message: "Found no token provided" })
  }
  jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized user" })
    }
    console.log(decoded);
    req.userId = decoded.id;
    next();
  })
}

module.exports = { verifyToken }