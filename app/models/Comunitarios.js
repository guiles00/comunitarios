const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var valorEstudios = new Schema({
  fecha:{
    type: Date,
    default: new Date()
  },
  doppler : {
    type: Number,
    default: 0,
    min: [0,"no puede ser menor a cero"]
  },
  bidi : {
    type: Number,
    default: 0,
    min: [0,"no puede ser menor a cero"]
  },
  doble : {
    type: Number,
    default: 0,
    min: [0,"no puede ser menor a cero"]
  },
  consultorio : {
    type: Number,
    default: 0,
    min: [0,"no puede ser menor a cero"]
  },
  _id: false
});

const comunitarioSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  estudios: [valorEstudios]
});

const Comunitarios = mongoose.model("comunitarios", comunitarioSchema);

module.exports = Comunitarios;
