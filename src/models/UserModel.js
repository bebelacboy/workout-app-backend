const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, require: true},
  bio: {type: String, require: false}
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = { UserModel }