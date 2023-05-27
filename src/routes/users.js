const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({"message": "User already registered in the system!"});
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username: username, password: hashedPassword });
  await newUser.save()

  res.json(newUser);
});
router.post("/login");

module.exports.userRouter = router;