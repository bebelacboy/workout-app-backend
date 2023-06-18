const express = require("express");

const { register, login } = require("../controller/userController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

module.exports.userRouter = router;