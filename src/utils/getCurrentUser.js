const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");

const getCurrentUser = async (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = jwt.decode(token).id;
  const user = await UserModel.findOne({ _id: userId });
  return user;
}

module.exports = getCurrentUser;