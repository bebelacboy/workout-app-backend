const { WorkoutPlanModel } = require("../models/WorkoutPlanModel");
const jwt = require("jsonwebtoken");
const getCurrentUser = require("../utils/getCurrentUser");

const createWorkoutPlan = async (req, res) => {
  const workoutPlanData = req.body;
  // Fill all exercise current weight initial value
  const user = await getCurrentUser(req);
  const newWorkoutPlan = new WorkoutPlanModel(workoutPlanData);
  await newWorkoutPlan.save();
  user.workoutPlans.push(newWorkoutPlan._id);
  user.save()

  return res.json({
    message: "Succesfully create new workout plan",
    workoutPlan: newWorkoutPlan
  })
}

const getWorkoutPlansList = async (req, res) => {
  const user = await getCurrentUser(req);
  const populatedUser = await user.populate('workoutPlans');
  return res.json(populatedUser.workoutPlans);
}

const getWorkoutPlanById = async (req, res) => {
  const workoutPlanId = req.params.id;
  const workoutPlan = await WorkoutPlanModel.findOne({_id: workoutPlanId});
  if (!workoutPlan) {
    return res.status(404).json({
      message: "Workout plan not found"
    })
  }
  return res.json(workoutPlan);
}

const deleteWorkoutPlanById = async (req, res) => {
  const workoutPlanId = req.params.id;
  const workoutPlan = await WorkoutPlanModel.findOne({_id: workoutPlanId});
  if (!workoutPlan) {
    return res.status(404).json({
      message: "Workout plan not found"
    })
  }
  const user = await getCurrentUser(req);
  user.workoutPlans.pull(workoutPlanId);
  await user.save();
  await WorkoutPlanModel.findByIdAndRemove(workoutPlanId);
  return res.json({
    message: `Succesfully delete workout plan with id ${workoutPlanId}`
  })
}

module.exports = { 
  createWorkoutPlan,
  getWorkoutPlansList,
  getWorkoutPlanById,
  deleteWorkoutPlanById,
}