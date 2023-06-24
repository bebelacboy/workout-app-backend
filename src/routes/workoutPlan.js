const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { 
  createWorkoutPlan, 
  getWorkoutPlansList, 
  getWorkoutPlanById,
  deleteWorkoutPlanById, 
  updateWorkoutPlan
} = require("../controller/workoutPlanController");


const router = express.Router();

router.use(verifyToken);

router.get("/", getWorkoutPlansList);

router.get("/:id", getWorkoutPlanById);

router.post("/", createWorkoutPlan);

router.put("/", updateWorkoutPlan);

router.delete("/:id", deleteWorkoutPlanById);

module.exports.workoutPlanRouter = router;