const express = require('express');
const router = express.Router();
const funcionarioCtrl = require('../controllers/funcionario.controller');

// Definir las rutas para la gestión de funcionarios
router.get('/', funcionarioCtrl.getFuncionarios);
router.post('/', funcionarioCtrl.createFuncionario);
router.get('/:id', funcionarioCtrl.getFuncionario);
router.put('/:id', funcionarioCtrl.editFuncionario);
router.delete('/:id', funcionarioCtrl.deleteFuncionario);
router.get('/search/legajo/:legajo', funcionarioCtrl.getFuncionarioByLegajo);

module.exports = router;
