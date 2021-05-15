"use strict";
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const { promisify } = require("util");
const { scrypt } = require("crypto");
const scryptAsync = promisify(scrypt);
const { BadRequestError } = require("../errors/bad-request-error");

module.exports = function(){
   
  const doLogout = function(req, res){
    req.session = null;
    req.logout();
    res.redirect("/");
  };

  const signUp = async function(req, res) {
    const { email, password } = req.body;
    console.log("entra aca")
    const existingUser = await User.findOne({ email });

    if(existingUser){
      throw new BadRequestError("Email in use");
    }

    const user = new User({ email, password})
    await user.save();
  
    // Generate JWT
    const userJwt = jwt.sign({
      id: user._id,
      email: user.email
    },"12345" //luego la saco de aca
    )

    //Store in on session Object
    req.session = {
      jwt: userJwt
    }
  
    res.status(201).send(user);
  }

  const signIn = async function(req, res) {

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if(!existingUser){
      throw new BadRequestError("Invalid credentials");
    }

    const [hashedPassword, salt] = existingUser.password.split(".");
    const buf = (await scryptAsync(password, salt, 64))
    
    const match = buf.toString("hex") === hashedPassword;

    if(!match){
      throw new Error("Invalid credentials");
    }
  
    // Generate JWT
    const userJwt = jwt.sign({
    id: existingUser._id,
    email: existingUser.email
    },"12345");

    //Store in on session Object
    req.session = {
      jwt: userJwt
    }

    res.status(200).send(existingUser);
  }
  
  const getUser = function(req, res){
    
    res.send({ currentUSer: req.currentUser || null})  
  }

  const signOut = function(req, res) {
    req.session = null;

    res.send({});
  }

  return { doLogout, signUp, signIn, getUser, signOut };
};
