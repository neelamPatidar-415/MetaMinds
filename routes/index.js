const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    res.render('home');
})

router.get('/themes', function(req,res){
    res.render('theme');
})

module.exports = router;