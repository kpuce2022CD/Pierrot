const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('./src/routes/auth/auth');

app.use(cors());
app.use(express.json());

app.use("/",auth);

module.exports = app;