const express = require('express');
const router = express.Router();

const {generate_session_plan} = require('../utils/Session-plan-generator.js');
const isLoggedIn = require('../middlewares/isLoggedIn.js')

// router.post('/generate-plan', function(req,res){
    
// })
router.get('/',isLoggedIn,function(req,res){
    res.render('theme');
})

router.post('/study', function(req,res){
    res.render('session');
})

module.exports = router;
