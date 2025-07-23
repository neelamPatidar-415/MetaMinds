const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    userId : { type : mongoose.Schema.Types.ObjectId, ref:"user"},
    theme: { type : mongoose.Schema.Types.ObjectId, ref:"Themes"},
    duration : Number,
    breakType: String,
    date : { type: Date, default: Date.now}
})

module.exports = mongoose.model("Session", SessionSchema);