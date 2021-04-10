"use strict";

const express = require("express");
const comunitariosRouter = require("./routes/comunitarios");
const prataComunitariosRouter = require("./routes/prataComunitarios");

module.exports = function () {

  const router = express.Router();
  const comunitarios = comunitariosRouter();
  const prataComunitarios = prataComunitariosRouter();

  router.get("/comunitarios", comunitarios.getAll);
  router.post("/comunitarios", comunitarios.addComunitario);
  router.get("/comunitarios/:id", comunitarios.findById);
  router.put("/comunitarios/:id", comunitarios.editComunitario);
  router.delete("/comunitarios/:id", comunitarios.deleteComunitario);
 
  router.get("/prataComunitario", prataComunitarios.getAll);
  router.get("/prataComunitario/:id", prataComunitarios.findById);
  router.post("/prataComunitario", prataComunitarios.addPrataComunitario);
  router.put("/prataComunitario/:id", prataComunitarios.edit)
  router.get("*", (req, res) => { res.status(404).send(); });

  return router;
};
