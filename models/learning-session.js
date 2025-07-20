const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  selectedPlan: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "session-plan",
    },
  ], // from SessionPlan
  breakType: String, // 'walk', 'box-breathing', etc
  status: String, // 'not-started', 'session1', 'break', 'session2', 'completed'
  createdAt: new Date(),
  endedAt: new Date(),
});

module.exports = mongoose.model("user", userSchema);
