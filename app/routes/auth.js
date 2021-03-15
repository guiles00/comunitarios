"use strict";

module.exports = function(){
   
  const doLogin = async function doLogin(req, res){
    res.status(400).send("doLogin");
  };

  const doLogout = function(req, res){
    req.session = null;
    req.logout();
    res.redirect("/");
  };

  const getAuth = function(req, res){
    const session = req.session;
    res.send({"user": session });
  };

  return { doLogin, doLogout, getAuth };
};
