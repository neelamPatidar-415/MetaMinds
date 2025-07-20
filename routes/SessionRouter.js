const express = require('express');
const router = express.Router();

const {generate_session_plan} = require('../utils/Session-plan-generator.js')

// router.post('/generate-plan', function(req,res){
    
// })

router.get('/study', function(req,res){
    res.render('session');
})

module.exports = router;