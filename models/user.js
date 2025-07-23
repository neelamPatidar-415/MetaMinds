const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    recentSessions : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "session",
        }
    ],  // to recommend later and recently used themes 
    picture: String,
    contact: Number,
})

module.exports = mongoose.model("user", userSchema);