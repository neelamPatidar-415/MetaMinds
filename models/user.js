const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Username : String,
    Password : String,
    Email : String,
    Session : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "session",
        }
    ]
})

module.exports = mongoose.model("user", userSchema);