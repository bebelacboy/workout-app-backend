const express = require("express");

const { register, login } = require("../controller/userController");
const { adminOnlyContent } = require("../controller/currentPlanController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/admin-only", verifyToken, adminOnlyContent);

module.exports.userRouter = router;