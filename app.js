const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');

const db = require('./config/mongoose-connection.js');
const config = require('config');
require('dotenv').config();


const flash = require("connect-flash");
const session = require('express-session');
const MongoStore = require('connect-mongo');
app.use(session({
  secret: 'process.env.EXPRESS_SESSION_SECRET',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
}));
app.use(flash());


const index = require('./routes/index.js');
const SessionRouter = require('./routes/SessionRouter.js');
const userRouter = require('./routes/UserRouter.js')

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.get('/', function(req,res){
    res.redirect('/index');
})

app.use('/index',index);
app.use('/Session',SessionRouter);
app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT);