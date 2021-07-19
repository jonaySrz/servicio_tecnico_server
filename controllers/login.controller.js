const Tecnico = require('../models/tecnicos')
const jwt = require('jsonwebtoken')

loginController = {};

loginController.login = async (req, res)=>{

    const user = await Tecnico.findOne({usuario: [req.body.usuario]}).exec()

    if(!user){
        return res.status(401).send('El usuario no existe')
    }
    if (user.contraseña !== req.body.password){
        return res.status(401).send('La contraseña no es correcta')
    }

    const token = jwt.sign({_id: user._id, usuario: user.usuario}, 'secretpass')

    let rol;
    if (user.usuario == 'admin'){
        rol = 'administrador'
    }
    else {
        rol = 'tecnico'
    }

    return res.status(200).json({token, rol, xyz: user._id})
}

module.exports = loginController