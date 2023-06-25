const mongoose = require("mongoose");

const WorkoutSessionSchema = mongoose.Schema({
  date: {type: Date, default: Date.now, required: true, unique:true},
  plan: {type: mongoose.Schema.Types.ObjectId, ref: "WorkoutPlan", required: true},
  exercises: [
    {
      name: {type: String, required: true},
      set: {type: Number, required: true},
      reps: {type: Number, required: true},
      weight: {type: Number, default: 0},
      isDone: {type: Boolean, default: false}    
    }
  ]
});

const WorkoutSessionModel = mongoose.model("WorkoutSession", WorkoutSessionSchema);

module.exports = { WorkoutSessionModel }