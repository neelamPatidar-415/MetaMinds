const mongoose = require('mongoose');
const config = require('config');
require('dotenv').config();

const dbgr = require("debug")("development:mongoose");

mongoose
.connect(process.env.MONGO_URI)
.then(function(){
    console.log("Connected to MongoDB");
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection;