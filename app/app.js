"use strict";

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");

const app = express();

require("./passport-setup");
const serverRouter = require("./serverRouter");

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
  name: "comunitarios-session",
  keys: ["key1", "key2"],
  httpOnly:false
}));

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));

app.use("/api", serverRouter(passport));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.get("*", (req, res) => {

  res.sendFile(path.resolve(__dirname, "../public", "index.html"));

});

module.exports = app;