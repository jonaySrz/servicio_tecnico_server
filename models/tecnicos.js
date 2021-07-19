const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Tecnico = new Schema({
    _id: {type: Number},
    usuario: {type: String},
    contraseña: {type: String},
    nombre: {type: String},
    apellidos: {type: String},
    telefono: {type: String},
    fecha_inicio: {type: String},
    fecha_fin: {type: String}
},
{ versionKey: false })

module.exports = new mongoose.model('tecnicos', Tecnico)