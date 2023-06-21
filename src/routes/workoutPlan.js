const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { createWorkoutPlan, getWorkoutPlansList, getWorkoutPlanById } = require("../controller/workoutPlanController");
const router = express.Router();

router.use(verifyToken);

router.get("/", getWorkoutPlansList);

router.get("/:id", getWorkoutPlanById);

router.post("/", createWorkoutPlan);

module.exports.workoutPlanRouter = router;