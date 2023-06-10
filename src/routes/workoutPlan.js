const express = require("express");
const { verifyToken } = require("../middleware/auth")
const router = express.Router();

router.use(verifyToken);

router.get("/", (req, res) => {
  res.send({ message: "Hi Congrats"})
})

module.exports.workoutPlanRouter = router;