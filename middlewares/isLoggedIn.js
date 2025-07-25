const jwt = require('jsonwebtoken');
const userModel = require("../models/user.js");

module.exports = async function(req,res,next){
    if(!req.cookies.token){
        req.flash("error", "You need to login first");
        return res.redirect("/users");
    }

    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findOne({email:decoded.email}).select("-password");   ///-password means no need to password their

        req.user = user;

        next();
    } catch(err){
        req.flash("error", "Something went wrong");
        return res.redirect("/users");
    }
};