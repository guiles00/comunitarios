
"use strict";

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("*", (req, res) => {

  res.status(200).send("holis worldiness");

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});


module.exports = app;
