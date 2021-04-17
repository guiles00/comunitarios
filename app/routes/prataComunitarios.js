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
   
    const {fecha, comunitarioId, cantidadDoppler,valorDoppler,cantidadBidi, valorBidi , cantidadDoble, valorDoble, cantidadConsultorio, valorConsultorio } = req.body;

    const cantidadEstudios = { cantidadDoppler, valorDoppler, cantidadDoble, valorDoble, cantidadBidi, valorBidi, cantidadConsultorio, valorConsultorio }
    
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

  const edit = async function edit(req, res){
  
    const _id = req.params.id;
    
    const {fecha, comunitarioId, cantidadDoppler,valorDoppler,cantidadBidi, valorBidi , cantidadDoble, valorDoble, cantidadConsultorio, valorConsultorio } = req.body;

    const cantidadEstudios = { cantidadDoppler, valorDoppler, cantidadDoble, valorDoble, cantidadBidi, valorBidi, cantidadConsultorio, valorConsultorio }
    try{
      //Esto no funciona, lo dejo acá porque debería ser así, más facil.
      // const prataComunitario = await PrataComunitario.findOneAndUpdate(_id,{fecha,comunitario:comunitarioId},{
      //   new: true
      // });
    
      const prataComunitario = await PrataComunitario.findById(_id)
      prataComunitario.fecha = fecha;
      prataComunitario.comunitario = comunitarioId;
      prataComunitario.cantidadEstudios = cantidadEstudios;

      await prataComunitario.save();

      res.status(200).send("Actualizado con exito");
    }catch(e){
      console.log(e);
      res.status(500).send({ "error":"Error tratando de editar" });
    }
  }

  const destroy = async function destroy(req, res){

    try{

      const { id } = req.params;

      const resultado = await PrataComunitario.findOneAndDelete(id);
    
      res.status(200).send("Actualizado con exito");

    }catch(e){
     
      console.log(e);
      res.status(500).send({ "error":"Error tratando de..." });
    }
    
  }

  return { getAll, addPrataComunitario,findById, edit, destroy };

};
