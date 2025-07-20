const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
  duration: String, // eg. '30-min', '45-min'
  theme: String, // eg. 'Focus', 'Chill'
  firstSession: Number, // in minutes
  breakTime: Number,
  secondSession: Number,
  musicTrack: String, // filename or ID
  animationType: String
}
)

module.exports = mongoose.model("user", userSchema);