const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");

const register = async (req, res) => {
  const { username, password, role } = req.body;
  const user = await UserModel.findOne({ username });
  // Memeriksa apakah sudah terdapat username yang sama di database
  if (user) {
    return res.status(500).send({ "message": "User already registered in the system!" });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username: username, password: hashedPassword, role: role });
  await newUser.save();

  res.json(newUser);
}

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({username});
  if (!user) {
    return res.status(401).send({ message: "Username or password is invalid!" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({ message: "Username or password is invalid!" });
  };

  const token = jwt.sign({id: user._id }, process.env.JWT_SECRET_KEY);
  res.json({ username, token, userId: user._id});
}

const adminOnlyContent = async (req, res) => {
  console.log(req.user.role)
  if (req.user.role == "ADMIN") {
    return res.status(200).json({
      message: "ADMIN ONLY CONTENT"
    });
  }
  return res.status(403).json({
    message: "FORBIDDEN CONTENT YOU ARE NOT ADMIN"
  })
}

module.exports = { register, login}