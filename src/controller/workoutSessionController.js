const { WorkoutSessionModel } = require("../models/WorkoutSessionModel");
const getCurrentUser = require("../utils/getCurrentUser");

const createWorkoutSession = async (req, res) => {
  const workoutSessionData = req.body;
  const user = await getCurrentUser(req);
  const populatedUser = await user.populate('workoutSessions');
  console.log(populatedUser);
  const existingWorkoutSession = populatedUser.workoutSessions.find((session) => {
    const sessionDate = new Date(session.date);
    const workoutSessionDataDate = new Date(workoutSessionData.date);
    return sessionDate.toLocaleDateString().replaceAll("/", "-") === workoutSessionDataDate.toLocaleDateString().replaceAll("/","-");
  });
  if (existingWorkoutSession) {
    return res.status(400).json({
      message: "Session already exist for this date"
    })
  }
  const newWorkoutSession = new WorkoutSessionModel(workoutSessionData);
  await newWorkoutSession.save();
  user.workoutSessions.push(newWorkoutSession._id);
  user.save()

  return res.json({
    message: "Succesfully create new workout session",
    workoutSession: newWorkoutSession
  })
}

const updateWorkoutSession = async (req, res) => {
  const updatedWorkoutSessionData = req.body;
  await WorkoutSessionModel.findByIdAndUpdate(updatedWorkoutSessionData._id, {
    plan: updatedWorkoutSessionData.plan,
    exercises: updatedWorkoutSessionData.exercises
  });
  const updatedWorkoutSession = await WorkoutSessionModel.findById(updatedWorkoutSessionData._id);
  console.log(updatedWorkoutSessionData);
  return res.json({
    message: "Succesfully update workout session",
    workoutSession: updatedWorkoutSession
  })
}

const getWorkoutSessionsList = async (req, res) => {
  const user = await getCurrentUser(req);
  const populatedUser = await user.populate('workoutSessions');
  return res.json(populatedUser.workoutSessions);
}

const getWorkoutSessionByDate = async (req, res) => {
  const user = await getCurrentUser(req);
  const populatedUser = await user.populate('workoutSessions');
  const paramDate = req.params.date;
  const workoutSession = populatedUser.workoutSessions.find((session) => {
    const sessionDate = new Date(session.date);
    return sessionDate.toLocaleDateString().replaceAll("/", "-") === paramDate;
  });
  if (!workoutSession) {
    return res.status(404).json({
      message: "Workout plan not found"
    })
  }
  return res.json(workoutSession);
}

module.exports = { 
  createWorkoutSession,
  getWorkoutSessionsList,
  getWorkoutSessionByDate,
  updateWorkoutSession
}