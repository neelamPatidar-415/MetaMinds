const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn.js');
const { SessionStudy} = require("../controllers/SessionStudy.js");

router.get('/',isLoggedIn,function(req,res){
    res.render('theme');
})

router.post('/study',isLoggedIn, SessionStudy);

module.exports = router;
