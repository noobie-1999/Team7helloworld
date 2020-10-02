const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userTestScoreSchema = new Schema({
  testId: String,
  score: Number,
  attempted: Boolean
})

// Create User Schema
const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  score: [userTestScoreSchema]
});

const User = mongoose.model("users", UserSchema);
const UserTestScores = mongoose.model("UserTestScores", userTestScoreSchema);

module.exports = {
  User,UserTestScores
}