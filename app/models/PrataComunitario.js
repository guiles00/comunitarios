const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// var cantidadEstudio = new Schema({
//   tipo  : {
//     type: String,
//     max: 255,
//   },
//   cantidad: Number, 
//   valor  : Number,
// });

// var valorEstudios = new Schema({
//   doppler : {
//     type: Number,
//     default: 0,
//     min: [0,"no puede ser menor a cero"]
//   },
//   bidi : {
//     type: Number,
//     default: 0,
//     min: [0,"no puede ser menor a cero"]
//   },
//   doble : {
//     type: Number,
//     default: 0,
//     min: [0,"no puede ser menor a cero"]
//   },
//   consultorio : {
//     type: Number,
//     default: 0,
//     min: [0,"no puede ser menor a cero"]
//   },
//   _id: false
// });


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