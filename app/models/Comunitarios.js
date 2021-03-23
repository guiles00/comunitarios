const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var estudio = new Schema({
  tipo  : {
    type: String,
    max: 255
  }, 
  valor  : {
    type: Number,
    default: 0,
    min: [0,"no puede ser menor a cero"]
  }
});

const comunitarioSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  estudios: [estudio]
});
  
const Comunitarios = mongoose.model("comunitarios", comunitarioSchema);

module.exports = Comunitarios;
