const express = require("express");
const app = express();

// cors
const cors = require("cors");

// mongo session
const session = require("express-session");
const mongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");

//import to mongodb
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

//import to routes
const auth = require("./src/routes/auth/auth");
const video = require("./src/routes/video/video");
const game = require("./src/routes/game/game");

const PORT = 3001;

app.listen(PORT,() =>{
    console.log("서버 가동");
});

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database successfully");
  }
});

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECERT,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({ mongoUrl: process.env.DB_URL }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24시간 후 만료
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000","https://han.d2st12ycswul38.amplifyapp.com/","*"],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);
//if you want get login enter into 'http://localhost:3001/auth/login'
//if you want signup enter into 'http://localhost:3001/auth/signup'
//if you want logout enter into 'http://localhost:3001/auth/logout'
//if you want get member information enter into 'http://localhost:3001/auth/getInfo'
//model from /models/db-schema/memberSchema
app.use("/auth", auth);

//if you want get video information enter into 'http://localhost:3001/video/uploadVideo'
//if you want post video information enter into 'http://localhost:3001/video/downloadVideo'
//model from /models/db-schema/gameSchema
app.use("/video", video);

//if you want add game Information enter into 'http://localhost:3001/game/postGameInfo'
//if you want get game Information enter into 'http://localhost:3001/game/getAllGameInfo'
//if you wnat get All game Information enter into 'http//localhost:3001/game/getAllGame'
//if you wnat get game Infromation by id enter into 'http//localhost:3001/game/getGameInfoById'
//model from /models/db-schema/gameSchema
app.use("/game", game);

module.exports = app;
