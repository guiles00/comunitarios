"use strict";
const PrataComunitario = require("../models/PrataComunitario");

module.exports = function(){

  const getAll = async function getAll(req, res){

    try{
      
      PrataComunitario.find().
        populate("comunitario").
        exec(function (err, prataComunitarios) {
          if (err) console.log("err");
  
          res.send({"prataComunitarios": prataComunitarios });
        });    
    }catch(e){
      res.status(500).send({ "error":"Error tratando de traer listado comunitario" });  
    }
  };
  
  const addPrataComunitario = async function addPrataComunitario(req, res){
   
    const {fecha, comunitarioId, cantidadDoppler,valorDoppler,cantidadBidi, valorBidi , cantidadDoble, valorDoble} = req.body;

    const cantidadEstudios = { cantidadDoppler, valorDoppler, cantidadDoble, valorDoble, cantidadBidi, valorBidi }
    
    const prataComunitario = new PrataComunitario({fecha:fecha,comunitario:comunitarioId,cantidadEstudios });

    try {

      prataComunitario.save(function (err) {
        if (err) {
          console.log(err);
        }
        res.send("alta exitosa");
      });
      
    }catch(e){
      res.status(500).send({ "error":"Error tratando de agregar el comunitario" });  
    }    
  
  };

  const findById = async function findById(req, res){

    const id = req.params.id;
    try{
      const item = await PrataComunitario.findById(id);
      res.json(item);
    }catch(e){
      console.log(e);
      res.status(500).send({ "error":"Error tratando de traer el comunitario" });
    }
  };


  return { getAll, addPrataComunitario,findById };

};
