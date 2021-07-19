const Tecnico = require('../models/tecnicos')

tecnicosController = {};

tecnicosController.listar = (req, res)=>{
    Tecnico.find().sort({nombre: -1}).exec((err, items)=>{

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

tecnicosController.listarUno = (req, res)=>{
    let id = req.params._id

    Tecnico.findOne({_id: [id]}).exec((err, items)=>{

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

tecnicosController.count = (req, res) =>{

    Tecnico.find({fecha_fin: ""}).countDocuments().exec((err, items)=>{

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

tecnicosController.filtro = (req, res)=>{
    if (req.params.estado == 'activos'){

        Tecnico.find({fecha_fin: ''}).exec((err, items)=>{
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

    else {
        Tecnico.find({fecha_fin: {$ne: ''}}).exec((err, items)=>{
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

tecnicosController.nuevoID = (req, res)=>{

    Tecnico.findOne().sort({_id: -1}).exec((err, items)=>{
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

tecnicosController.nuevoTecnico = (req, res)=>{
    let nuevoEmpleado = new Tecnico(req.body)
    nuevoEmpleado.contraseña = req.body.password
    
    nuevoEmpleado.save(
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

tecnicosController.editar = (req, res)=>{
    Tecnico.updateOne({_id: req.body._id}, {$set: req.body}).exec((err)=>{
        if (err){
            console.log(err);
            res.send(JSON.stringify({error: err}))
        }

        else {
            res.send(JSON.stringify({success: true}))
        }
    })
}


module.exports = tecnicosController;