const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prataComunitarioSchema = new Schema({
  fecha: {
    type: String,
    required: true
  },
  comunitario: { type: Schema.Types.ObjectId, ref: "comunitarios" },
  cantidadEstudios: {}
  
});
  
const PrataComunitario = mongoose.model("PrataComunitario", prataComunitarioSchema);

module.exports = PrataComunitario;