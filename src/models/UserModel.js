const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  currentPlan: {type: mongoose.Schema.Types.ObjectId, required: false, ref: "WorkoutPlan"},
  password: {type: String, require: true},
  bio: {type: String, require: false},
  workoutPlans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkoutPlan"
    }
  ]
});


const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel };