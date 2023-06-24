const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { 
  getWorkoutSessionsList,
  createWorkoutSession,
  getWorkoutSessionByDate,
  updateWorkoutSession } = require("../controller/workoutSessionController");


const router = express.Router();

router.use(verifyToken);

router.get("/", getWorkoutSessionsList);
router.get("/:date", getWorkoutSessionByDate);
router.post("/", createWorkoutSession);
router.put("/", updateWorkoutSession);

module.exports.workoutSessionRouter = router;