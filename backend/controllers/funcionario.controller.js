const Funcionario = require('../models/funcionario');
const funcionarioCtrl = {};

// Obtener todos los funcionarios
funcionarioCtrl.getFuncionarios = async (req, res) => {
    try {
        const funcionarios = await Funcionario.find().populate('persona');
        res.json(funcionarios);
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error al obtener funcionarios.',
            error
        });
    }
};

// Crear un nuevo funcionario
funcionarioCtrl.createFuncionario = async (req, res) => {
    const funcionario = new Funcionario(req.body);
    try {
        await funcionario.save();
        res.json({
            status: '1',
            msg: 'Funcionario guardado.',
            funcionario
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al guardar funcionario.',
            error
        });
    }
};

// Obtener un funcionario por ID
funcionarioCtrl.getFuncionario = async (req, res) => {
    try {
        const funcionario = await Funcionario.findById(req.params.id).populate('persona');
        if (!funcionario) {
            return res.status(404).json({
                status: '0',
                msg: 'Funcionario no encontrado.'
            });
        }
        res.json(funcionario);
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error al obtener funcionario.',
            error
        });
    }
};

// Actualizar un funcionario
funcionarioCtrl.editFuncionario = async (req, res) => {
    try {
        const funcionario = await Funcionario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!funcionario) {
            return res.status(404).json({
                status: '0',
                msg: 'Funcionario no encontrado.'
            });
        }
        res.json({
            status: '1',
            msg: 'Funcionario actualizado.',
            funcionario
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al actualizar funcionario.',
            error
        });
    }
};

// Eliminar un funcionario
funcionarioCtrl.deleteFuncionario = async (req, res) => {
    try {
        const funcionario = await Funcionario.findByIdAndDelete(req.params.id);
        if (!funcionario) {
            return res.status(404).json({
                status: '0',
                msg: 'Funcionario no encontrado.'
            });
        }
        res.json({
            status: '1',
            msg: 'Funcionario eliminado.'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al eliminar funcionario.',
            error
        });
    }
};

funcionarioCtrl.getFuncionarioByLegajo = async (req, res) => {
    try {
        const funcionario = await Funcionario.findOne({ legajo: req.params.legajo })
            .populate('persona');
        if (!funcionario) {
            return res.status(404).json({
                status: '0',
                msg: 'Funcionario no encontrado.'
            });
        }
        res.json(funcionario);
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error al obtener el funcionario por legajo.',
            error
        });
    }
};

module.exports = funcionarioCtrl;
