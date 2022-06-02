const express = require("express");
const app = express();

//import to mongodb
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

//import to routes
const auth = require("./src/routes/auth/auth");
const video = require("./src/routes/video/video");
const game = require("./src/routes/game/game");

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database successfully");
  }
});

app.use(bodyParser.json());

//if you want get member information enter into 'http://localhost:3001/auth/getMember'
//if you want postMember information enter into 'http://localhost:3001/auth/postMember'
//model from /models/db-schema/memberSchema
app.use("/auth", auth);

//if you want get video information enter into 'http://localhost:3001/video/uploadVideo'
//if you want post video information enter into 'http://localhost:3001/video/downloadVideo'
//model from /models/db-schema/gameSchema
app.use("/video", video);

//if you want add game Information enter into 'http://localhost:3001/game/postGameInfo'
//if you want get game Information enter into 'http://localhost:3001/game/getGameInfo'
//model from /models/db-schema/gameSchema
app.use("/game", game);

module.exports = app;
