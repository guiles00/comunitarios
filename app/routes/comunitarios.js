"use strict";
const Comunitarios = require("../models/Comunitarios");
const _ = require("lodash");  
  
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
    
    const comunitario = new Comunitarios({nombre:nombre, estudios:[{doppler,bidi,doble,consultorio}]});

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
    
    const valorEstudios = {doppler, bidi, doble, consultorio};
    
    try{

      //Guarda el nombre y si los valores de los estudios cambiaron agrega un elemento nuevo
      // en estudios
      
      const comunitario = await Comunitarios.findById(_id);
      comunitario.nombre = nombre;
      const ultimosValores = comunitario.estudios[comunitario.estudios.length -1];
      
      //queda pendiente mejorar el codigo
       const objUltimosValores = {"doppler":ultimosValores.doppler,"bidi":ultimosValores.bidi,"doble":ultimosValores.doble,"consultorio":ultimosValores.consultorio} 
       if(JSON.stringify(objUltimosValores) !== JSON.stringify(valorEstudios)) 
       comunitario.estudios.push(valorEstudios);      
      
       await comunitario.save();

      res.status(200).send("ok");
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

/*Deberia editar de esta manera
db.getCollection('comunitarios').update(
    // query 
    {
        "_id" : ObjectId("6059d2d0c68fcd1237aea5be")
    },
    
    // update 
    {
            "$addToSet":{
            "estudios":{
              "doppler":101,
              "consultorio":101,
              "doble":10,
              "bidi":10   
               }  
            }   
    },
    
    // options 
    {
        "multi" : false,  // update only one document 
        "upsert" : false  // insert a new document, if no existing document match the query 
    }
);*/