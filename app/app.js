"use strict";

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const serverRouter = require("./serverRouter");

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.use("/api", serverRouter());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.get("*", (req, res) => {

  res.sendFile(path.resolve(__dirname, "../public", "index.html"));

});

module.exports = app;