"use strict";
const PrataComunitario = require("../models/PrataComunitario");

module.exports = function(){

  const getAll = async function getAll(req, res){

    PrataComunitario.find().
      populate("comunitario").
      exec(function (err, prataComunitarios) {
        if (err) console.log(err);

        res.send({"prataComunitarios": prataComunitarios });
      });    
  };
  
  const addPrataComunitario = async function addPrataComunitario(req, res){
   
    const {fecha, comunitarioId, cantidadDoppler,valorDoppler,cantidadBidi, valorBidi , cantidadDoble, valorDoble} = req.body;

    const arrayCantEstudios = [{"tipo":"doppler","cantidad":cantidadDoppler, "valor":valorDoppler}
      ,{"tipo":"bidi","cantidad":cantidadBidi, "valor":valorBidi}
      ,{"tipo":"doble","cantidad":cantidadDoble, "valor":valorDoble}];

    const prataComunitario = new PrataComunitario({fecha:fecha,comunitario:comunitarioId,cantidadEstudios: arrayCantEstudios });
    
    prataComunitario.save(function (err) {
      if (err) {
        console.log(err);
        res.status(500).send({ "error":"Error tratando de agregar el comunitario" });
      }
    });

    res.send("alta exitosa?");

  };

  return { getAll, addPrataComunitario };

};
