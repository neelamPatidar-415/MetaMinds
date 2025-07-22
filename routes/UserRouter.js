const express = require("express");
const router = express.Router();

const {registerUser, loginUser, logoutUser} = require('../controllers/authController.js')

router.get('/', function(req,res){
    let error = req.flash("error");   //// flash msg error name se bheja tha isLogged in page me vaha se redirect hoke yaha aaya he 
    let success = req.flash("success");  
    res.render("welcome", {error,success, loggedin:false});
})

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser);

module.exports = router;
