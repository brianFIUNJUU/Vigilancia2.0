const express = require('express');
const router = express.Router();
const vigilanciaCtrl = require('../controllers/vigilancia.controller');


// Definir rutas para el CRUD de Vigilancia
router.get('/', vigilanciaCtrl.getVigilancias);
router.post('/', vigilanciaCtrl.createVigilancia);
router.get('/:id', vigilanciaCtrl.getVigilancia);
router.put('/:id', vigilanciaCtrl.editVigilancia);
router.delete('/:id', vigilanciaCtrl.deleteVigilancia);

module.exports = router;
