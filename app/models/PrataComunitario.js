const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var cantidadEstudio = new Schema({
  tipo  : {
    type: String,
    max: 255,
  },
  cantidad: Number, 
  valor  : Number,
});

const prataComunitarioSchema = new Schema({
  fecha: {
    type: String,
    required: true
  },
  comunitario: { type: Schema.Types.ObjectId, ref: "comunitarios" },
  cantidadEstudios: [ cantidadEstudio ]
  
});
  
const PrataComunitario = mongoose.model("PrataComunitario", prataComunitarioSchema);

module.exports = PrataComunitario;