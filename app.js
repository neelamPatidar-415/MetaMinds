const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.get('/home', function(req,res){
    res.render('home');
})

app.get('/try2', function(req,res){
    res.render('try2');
})

app.get('/theme' , function(req,res){
    res.render('theme');
})

app.get('/plan' , function(req,res){
    res.render('plan');
})

app.get('/session' , function(req,res){
    res.render('session');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);