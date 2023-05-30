const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    // return res.status(500).json({"message": "User already registered in the system!"});
    return res.status(500).send({"message": "User already registered in the system!"});
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username: username, password: hashedPassword });
  await newUser.save();

  res.json(newUser);
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(401).send({ message: "Username or password is invalid!" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({ message: "Username or password is invalid!" });
  };

  const token = jwt.sign({ id: user._id }, "nutritionsecret");
  res.json({ token, userId: user._id});
});

module.exports.userRouter = router;