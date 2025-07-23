const userModel = require("../models/user.js");

const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
  let { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    req.flash("error", "All fields are required!");
    return res.redirect("/users"); 
  }

  try {
    let { fullname, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      req.flash("success", "You already have account. Please Login");
      return res.redirect("/users");
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) res.send(err.message);
        else {
          const user = await userModel.create({
            fullname,
            email,
            password: hash,
          });
          let token = generateToken(user);
          res.cookie("token", token);
          req.flash("success", "User Created Successfully, Want to Login Now");
          return res.redirect("/users");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async function(req,res){
    let { email, password} = req.body;

    if (!email || !password) {
    req.flash("error", "All fields are required!");
    return res.redirect("/users"); 
    }

    let user = await userModel.findOne({email});
    if(!user) {
      req.flash("error","email or password incorrect");
      return res.redirect("/users");
    }

    bcrypt.compare(password, user.password, async function(err, result){
        if (result) {
          let token = generateToken(user);
          res.cookie("token", token);
        //   res.render('home');
          return res.redirect("/");
        } else {
          req.flash("error", "email or password incorrect");
          return res.redirect("/users");
        }
    })
};


module.exports.logoutUser = async function(req,res){
    res.cookie("token","");
    res.redirect('/');
};
