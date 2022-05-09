const express = require('express');
const app = express();
const auth = require('./src/routes/auth/auth');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config({path:'config.env'});

mongoose.connect(process.env.DB_URL ,{useNewUrlParser:true},(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log('Connected to database successfully');
  }
});

app.use(bodyParser.json());
app.use("/auth",auth);
// app.use("/video",video);
// app.use("/game",game);

module.exports = app;