const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Tarea = new Schema({
    _id: {type: mongoose.Types.ObjectId},
    tecnico: {type: Number},
    fecha: {type: String},
    cliente: {type: String},
    descripcion: {type: String},
    facturable: {type: Boolean}, 
    importe: {type: Number}
},
{ versionKey: false })

module.exports = new mongoose.model('tareas', Tarea)