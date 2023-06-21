const mongoose = require("mongoose");

const WorkoutPlanSchema = mongoose.Schema({
  name: {type: String, required: true},
  frequency: {type: Number, required: true},
  workoutSessions: [
    {
      day: {type: String, required: true},
      exercises: [
        {
          name: {type: String, required: true},
          set: {type: Number, required: true},
          reps: {type: Number, required: true},
          currentWeight: {type: Number, default: 0}
        }
      ]
    }
  ],
});

const WorkoutPlanModel = mongoose.model("WorkoutPlan", WorkoutPlanSchema);

module.exports = { WorkoutPlanModel }