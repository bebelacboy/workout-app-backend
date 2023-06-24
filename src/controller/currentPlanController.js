const { UserModel } = require("../models/UserModel");
const { WorkoutPlanModel } = require("../models/WorkoutPlanModel");
const getCurrentUser = require("../utils/getCurrentUser");

const getCurrentUserPlanId = async (req, res) => {
  const user = await getCurrentUser(req);
  const currentPlanId = user.currentPlan;
  if (currentPlanId) {
    return res.json({
      currentPlanId
    })
  }
  return res.json({
    currentPlanId: ""
  })
}

const setCurrentUserPlanId = async (req, res) => {
  const planId = req.body.planId;
  const user = await getCurrentUser(req);
  const workoutPlan = await WorkoutPlanModel.findById(planId);
  if (!workoutPlan) {
    return res.status(404).json({
      message: "Workout plan not found"
    })
  }
  await UserModel.findByIdAndUpdate(user._id, {
    currentPlan: workoutPlan._id
  });
  
  return res.json({
    message: "Succesfully set new current plan",
    currentPlan: workoutPlan
  })
}

const removeCurrentUserPlanId = async (req, res) => {
  const user = await getCurrentUser(req);
  // await UserModel.findByIdAndUpdate({id: user._id}, {
  //   $unset: {
  //     currentPlan: 
  //   }
  // });
  // await UserModel.findByIdAndUpdate(user._id, {
  //   currentPlan: undefined
  // })
  user.currentPlan = undefined;
  await user.save();

  return res.json({
    message: "Succesfully remove current new plan"
  })
}

module.exports = {
  getCurrentUserPlanId,
  setCurrentUserPlanId,
  removeCurrentUserPlanId
}