const express = require('express');
const router = express.Router();
const tareasController = require('./controllers/tareas.controller')
const tecnicosController = require('./controllers/tecnicos.controller')
const loginController = require('./controllers/login.controller')
const auth = require('./auth')

//rutas de tecnicos

router.get('/tecnicos', auth.verifyToken, tecnicosController.listar)
router.get('/tecnicos/lista/:_id', auth.verifyToken, auth.verifyRol, tecnicosController.listarUno)
router.get('/tecnicos/count', auth.verifyToken, auth.verifyRol, tecnicosController.count)
router.get('/tecnicos/filtro/:estado', auth.verifyToken, auth.verifyRol, tecnicosController.filtro)
router.get('/tecnicos/nuevo/id', auth.verifyToken, auth.verifyRol, tecnicosController.nuevoID)

router.post('/tecnicos/guardar/nuevo', auth.verifyToken, auth.verifyRol, tecnicosController.nuevoTecnico)
router.post('/tecnicos/guardar/editar', auth.verifyToken, auth.verifyRol, tecnicosController.editar)


//rutas de tareas

router.get('/tareas', auth.verifyToken, auth.verifyRol, tareasController.listar)
router.get('/tareas/lista/:_id', auth.verifyToken, tareasController.listarUno)
router.get('/tareas/count', auth.verifyToken, auth.verifyRol, tareasController.count)

router.get('/tareas/filtro/unico/:id', auth.verifyToken, tareasController.filtro)
router.post('/tareas/filtro/doble', auth.verifyToken, auth.verifyRol, tareasController.filtroDoble)
router.post('/tareas/filtro/clientes', auth.verifyToken, auth.verifyRol, tareasController.filtroClientes)

router.post('/tareas/filtro/stats', auth.verifyToken, auth.verifyRol, tareasController.stats)

router.get('/tareas/clientes/lista', auth.verifyToken, tareasController.listaClientes)

router.post('/tareas/guardar/nueva', auth.verifyToken, tareasController.nuevaTarea)
router.post('/tareas/guardar/editar', auth.verifyToken, tareasController.editar)

router.post('/tareas/guardar/borrar', auth.verifyToken, auth.verifyRol, tareasController.borrar)

//rutas de login

router.post('/login', loginController.login)

module.exports = router;