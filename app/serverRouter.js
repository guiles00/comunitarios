"use strict";

const express = require("express");
const comunitariosRouter = require("./routes/comunitarios");
const prataComunitariosRouter = require("./routes/prataComunitarios");
const authRouter = require("./routes/auth");

const  { body } = require("express-validator");
const { validateRequest } = require("./middlewares/validate-request");
const { NotFoundError } = require("./errors/not-found-error");

const { currentUser } = require("./middlewares/current-user");
const { requireAuth } = require("./middlewares/require-auth");

module.exports = function () {

  const router = express.Router();
  const comunitarios = comunitariosRouter();
  const prataComunitarios = prataComunitariosRouter();
  const auth = authRouter();

  router.post("/auth/signup", 
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().isLength({min: 4, max: 20})
    .withMessage("Password must be between 4 and 20 characters")
  ]
  ,validateRequest
  ,auth.signUp);

  router.post("/auth/signin", 
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim()
    .notEmpty()
    .withMessage("You must supply a password")
  ]
  ,validateRequest
  
  ,auth.signIn);

  router.get("/auth/currentuser", requireAuth,auth.getUser);
  router.get("/auth/signout", auth.signOut);

  router.get("/comunitarios", requireAuth,comunitarios.getAll);  

  router.post("/comunitarios", 
  [
    body("nombre").not().isEmpty().withMessage("Nombre no puede estar vacio")
  ]
  ,validateRequest
  ,requireAuth
  ,comunitarios.addComunitario);

  router.get("/comunitarios/:id", requireAuth, comunitarios.findById);
  
  router.put("/comunitarios/:id", 
  [
    body("nombre").not().isEmpty().withMessage("Nombre no puede estar vacio")
  ],
  validateRequest
  ,requireAuth
  ,comunitarios.editComunitario);
  
  router.delete("/comunitarios/:id",requireAuth, comunitarios.deleteComunitario);
 
  router.get("/prataComunitario",requireAuth, prataComunitarios.getAll);
  router.get("/prataComunitario/:id",requireAuth, prataComunitarios.findById);
  router.post("/prataComunitario",requireAuth, prataComunitarios.addPrataComunitario);
  router.put("/prataComunitario/:id",requireAuth, prataComunitarios.edit);
  router.delete("/prataComunitario/:id",requireAuth, prataComunitarios.destroy);
  
  router.all("*", (req, res, next) => { 
    throw new NotFoundError();  
  });

  return router;
};
