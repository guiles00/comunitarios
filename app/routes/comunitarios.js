"use strict";
const Comunitarios = require("../models/Comunitarios");
const _ = require("lodash");
const  { validationResult } = require("express-validator");
const { NotFoundError } = require("../errors/not-found-error");

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

    const errors = validationResult(req);

    const { nombre, doppler, bidi, doble, consultorio } = req.body;

    const comunitario = new Comunitarios({nombre:nombre, estudios:[{doppler,bidi,doble,consultorio}]});

    await comunitario.save();

    res.status(201).send(comunitario);
  };

  const editComunitario = async function editComunitario(req, res){

    const { nombre, doppler, bidi, doble, consultorio } = req.body;
    const _id = req.params.id;

    const valorEstudios = {doppler, bidi, doble, consultorio};

    const comunitario = await Comunitarios.findById(_id);

    if(!comunitario) {
      throw new NotFoundError();
    }
    comunitario.nombre = nombre;
    comunitario.estudios.addToSet({doppler,bidi,doble,consultorio});

    await comunitario.save();

    res.send(comunitario);
  
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
