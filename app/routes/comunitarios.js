"use strict";
const Comunitarios = require("../models/Comunitarios");

module.exports = function(){

  const getAll = async function getAll(req, res){

    try{

      const items = await Comunitarios.find();
      
      res.send({"comunitarios": items });
    }catch(e){
      console.log(e);
      res.status(500).send({ "error":"Error tratando de traer los comunitarios" });
    }
  };
  
  const findById = async function findById(req, res){

    const id = req.params.id;
    try{
      const item = await Comunitarios.findById(id);
      res.json(item);  
    }catch(e){
      console.log(e);
      res.status(500).send({ "error":"Error tratando de traer el comunitario" });
    }
  };

  const addComunitario = async function addComunitario(req, res){

    const { nombre, doppler, bidi, doble, consultorio } = req.body;
    
    const comunitario = new Comunitarios({nombre:nombre, estudios:[{"tipo":"doppler","valor":doppler}
      ,{"tipo":"BIDI","valor":bidi},{"tipo":"doble","valor":doble},{"tipo":"consultorio","valor":consultorio}]});

    comunitario.save(function (err) {
      if (err) {
        console.log(err);
        res.status(500).send({ "error":"Error tratando de agregar el comunitario" });
      }
    });

    res.send("alta exitosa");
  };

  const editComunitario = async function editComunitario(req, res){
  
    const { nombre, doppler, bidi, doble, consultorio } = req.body;
    const _id = req.params.id;
    const comunitario = {"nombre": nombre,"estudios":[{"tipo":"doppler","valor":doppler}
      ,{"tipo":"BIDI","valor":bidi},{"tipo":"doble","valor":doble},{"tipo":"consultorio","valor":consultorio}]};
    
    try{
      await Comunitarios.findByIdAndUpdate({_id}, comunitario);      
    }catch(e){
      console.log(e);
      res.status(500).send({ "error":"Error tratando de traer el comunitario" });
    }
  };

  const deleteComunitario = async function deleteComunitario(req, res){

    const _id = req.params.id;
    
    try{

      await Comunitarios.findByIdAndDelete({_id});    
      res.send("borrado");  
    }catch(e){
      console.log(e);
      res.status(500).send({ "error":"Error tratando de eliminar el comunitario" });
    }
  };

  return { getAll, findById, addComunitario, editComunitario, deleteComunitario };

};
