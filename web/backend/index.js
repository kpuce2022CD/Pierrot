const express = require("express");
const app = express();

//import to mongodb
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config({path:'./config.env'});

//import to routes
const auth = require('./src/routes/auth/auth');
const video = require('./src/routes/video/video');
const game = require('./src/routes/game/game');

mongoose.connect(process.env.DB_URL ,{useNewUrlParser:true},(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log('Connected to database successfully');
  }
});

app.use(bodyParser.json());
//if you want get member information enter into 'http://localhost:3001/auth/getMember'
//if you want postMember information enter into 'http://localhost:3001/auth/postMember'
//member
app.use("/auth",auth);

//if you want get video information enter into 'http://localhost:3001/video/uploadVideo'
app.use("/video",video);
app.use("/game",game);

module.exports = app;