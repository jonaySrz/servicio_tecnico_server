const Tarea = require('../models/tareas')
const mongoose = require('mongoose')

tareasController = {};

tareasController.listar = (req, res)=>{
    Tarea.find().sort({tecnico: -1}).exec((err, items)=>{

        if (err){
            console.log(err);
            res.send(JSON.stringify(err))
        }

        if (items.length == 0){
            res.send(JSON.stringify({mensaje: 'lo sentimos, ha sucedido un error, no se ha encontrado ningún registro'}))
        }

        else {
            res.send(JSON.stringify(items))
        }
    })
}

tareasController.listarUno = (req, res)=>{
    let id = mongoose.Types.ObjectId(req.params._id)

    Tarea.findOne({_id: [id]}).exec((err, items)=>{

        if (err){
            console.log(err);
            res.send(JSON.stringify(err))
        }

        if (items.length == 0){
            res.send(JSON.stringify({mensaje: 'lo sentimos, ha sucedido un error, no se ha encontrado ningún registro'}))
        }

        else {
            res.send(JSON.stringify(items))
        }
    })
}

tareasController.count = (req, res) =>{

    Tarea.find().countDocuments().exec((err, items)=>{

        if (err){
            console.log(err);
            res.send(JSON.stringify(err))
        }

        if (items.length == 0){
            
            res.send(JSON.stringify({mensaje: 'lo sentimos, ha sucedido un error, no se ha encontrado ningún registro'}))
        }

        else {
            
            res.send(JSON.stringify(items))
        }
    })
}

tareasController.filtro = (req, res)=>{

    Tarea.find({tecnico: req.params.id}).exec((err, items)=>{

        if (err){
            console.log(err);
            res.send(JSON.stringify(err))
        }

        if (items.length == 0){
            res.send(JSON.stringify({mensaje: 'lo sentimos, ha sucedido un error, no se ha encontrado ningún registro'}))
        }

        else {
            res.send(JSON.stringify(items))
        }
    })
}

tareasController.listaClientes = (req, res)=>{
    Tarea.find().distinct('cliente').exec((err, items)=>{

        if (err){
            console.log(err);
            res.send(JSON.stringify(err))
        }

        if (items.length == 0){
            res.send(JSON.stringify({mensaje: 'lo sentimos, ha sucedido un error, no se ha encontrado ningún registro'}))
        }

        else {
            res.send(JSON.stringify(items))
        }
    })
}

tareasController.filtroDoble = (req, res)=>{

    Tarea.find({tecnico: req.body.id, cliente: req.body.cliente}).exec((err, items)=>{

        if (err){
            console.log(err);
            res.send(JSON.stringify(err))
        }

        if (items.length == 0){
            res.send(JSON.stringify({mensaje: 'lo sentimos, ha sucedido un error, no se ha encontrado ningún registro'}))
        }

        else {
            res.send(JSON.stringify(items))
        }
    })
}

tareasController.filtroClientes = (req, res)=>{
    console.log('PASANDO'); 

    Tarea.find({cliente: [req.body.cliente]}).exec((err, items)=>{

        if (err){
            console.log(err);
            res.send(JSON.stringify(err))
        }

        if (items.length == 0){
            res.send(JSON.stringify({mensaje: 'lo sentimos, ha sucedido un error, no se ha encontrado ningún registro'}))
        }

        else {
            res.send(JSON.stringify(items))
        }
    })
}

tareasController.nuevaTarea = (req, res)=>{
    req.body.fecha = new Date(req.body.fecha).toISOString()

    let nueva_tarea = new Tarea(req.body)
    nueva_tarea._id = new mongoose.Types.ObjectId();
    
    nueva_tarea.save(
        (err)=>{
            if (err){
                res.send(JSON.stringify({error: err}))
            }
            else {
                res.send(JSON.stringify({success: true}))
            }
        }
    )
}

tareasController.editar = (req, res)=>{

    Tarea.updateOne({_id: req.body._id}, {$set: req.body}).exec((err)=>{
        if (err){
            console.log(err);
            res.send(JSON.stringify({error: err}))
        }

        else {
            res.send(JSON.stringify({success: true}))
        }
    })
}

tareasController.borrar = (req, res)=>{

    Tarea.deleteOne({_id: req.body._id}).exec((err)=>{
        
        if (err){
            console.log(err);
            res.send(JSON.stringify({error: err}))
        }

        else {
            res.send(JSON.stringify({success: true}))
        }
    })
}

tareasController.stats = (req, res)=>{

    if (req.body.tec !== null && req.body.fecha !== null){
        Tarea.find({tecnico: req.body.tec, fecha: new RegExp(""+req.body.fecha+"")}).exec((err, items)=>{

            if (err){
                console.log(err);
                res.send(JSON.stringify(err))
            }
    
            if (items.length == 0){
                res.send(JSON.stringify({mensaje: 'lo sentimos, ha sucedido un error, no se ha encontrado ningún registro'}))
            }
    
            else {
                res.send(JSON.stringify(items))
            }
        })
    }

    if (req.body.tec == null && req.body.fecha !== null){
        Tarea.find({fecha: new RegExp(""+req.body.fecha+"")}).exec((err, items)=>{

            if (err){
                console.log(err);
                res.send(JSON.stringify(err))
            }
    
            if (items.length == 0){
                res.send(JSON.stringify({mensaje: 'lo sentimos, ha sucedido un error, no se ha encontrado ningún registro'}))
            }
    
            else {
                res.send(JSON.stringify(items))
            }
        })
    }

    if (req.body.tec !== null && req.body.fecha == null){
        Tarea.find({tecnico: req.body.tec}).exec((err, items)=>{

            if (err){
                console.log(err);
                res.send(JSON.stringify(err))
            }
    
            if (items.length == 0){
                res.send(JSON.stringify({mensaje: 'lo sentimos, ha sucedido un error, no se ha encontrado ningún registro'}))
            }
    
            else {
                res.send(JSON.stringify(items))
            }
        })
    }

    if (req.body.tec == null && req.body.fecha == null){
        Tarea.find().exec((err, items)=>{

            if (err){
                console.log(err);
                res.send(JSON.stringify(err))
            }
    
            if (items.length == 0){
                res.send(JSON.stringify({mensaje: 'lo sentimos, ha sucedido un error, no se ha encontrado ningún registro'}))
            }
    
            else {
                res.send(JSON.stringify(items))
            }
        })
    }
}


module.exports = tareasController;