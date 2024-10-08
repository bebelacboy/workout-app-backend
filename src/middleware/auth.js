const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(403).send({ message: "Found no token provided" })
  }
  jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized user" })
    }
    UserModel.findOne({
      _id: decoded.id
    }).then((user) => {
      req.user = user;
      next();
      }
    ).catch((err) => {
      res.status(500).send(
        {
          message: err
        }
      );
    })
  })
}

module.exports = { verifyToken }