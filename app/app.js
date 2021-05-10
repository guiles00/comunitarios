"use strict";

const express = require("express");
//agrego este paquete para poder usar el error handler con async
require("express-async-errors");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const cookieSession = require("cookie-session");

const app = express();

const serverRouter = require("./serverRouter");
const { errorHandler } = require("./middlewares/error-handler");
const { currentUser } = require("./middlewares/current-user");

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.use(
  cookieSession({
    signed: false,
  })
)

app.use("/api",currentUser, serverRouter());
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false 
});

app.get("*", (req, res) => {

  res.sendFile(path.resolve(__dirname, "../public", "index.html"));

});

module.exports = app;