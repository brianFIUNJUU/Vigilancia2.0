const Vigilancia = require('../models/vigilancia');

const vigilanciaCtrl = {};

// Obtener todas las vigilancias
vigilanciaCtrl.getVigilancias = async (req, res) => {
    try {
        const vigilancias = await Vigilancia.find()
            .populate('persona', 'nombre') // Opcional: para obtener datos de la persona
            .populate('funcionario', 'cargo') // Opcional: para obtener datos del funcionario
            .populate('juridiccion', 'juridiccion'); // Opcional: para obtener datos de la dependencia
        res.status(200).json(vigilancias);
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error fetching vigilancias', error: error.message });
    }
};

// Crear una nueva vigilancia
vigilanciaCtrl.createVigilancia = async (req, res) => {
    try {
        const {
            unidad_solicitante,
            objetivo, 
            cant_dias, 
            fecha_inicio, 
            fecha_fin, 
            destino, 
            latitud, 
            longitud, 
            turno_asignado, 
            persona, 
            funcionario, 
            juridiccion, 
            vigilancia, 
            recurso, 
            prioridad, 
            observaciones, 
            activo, 
            motivo_custodia,
            archivo,
            archivo1,
            archivo2,
            archivo3,
            archivo4,
            archivo5, 
            tipoArchivo,
            nombreArchivo,
            tipoArchivo1,
            nombreArchivo1,
            tipoArchivo2,
            nombreArchivo2,
            tipoArchivo3,
            nombreArchivo3,
            tipoArchivo4,
            nombreArchivo4,
            tipoArchivo5,
            nombreArchivo5,
        } = req.body;

        const newVigilancia = new Vigilancia({
            unidad_solicitante,
            objetivo,
            cant_dias,
            fecha_inicio,
            fecha_fin,
            destino,
            latitud,
            longitud,
            turno_asignado,
            persona,
            funcionario: funcionario || null, // Asigna null si funcionario no está presente
            juridiccion,
            vigilancia,
            recurso,
            prioridad,
            observaciones,
            activo,
            motivo_custodia,
            archivo,
            archivo1,
            archivo2,
            archivo3,
            archivo4,
            archivo5, 
            tipoArchivo,
            nombreArchivo, // Incluye el nombre del archivo
            tipoArchivo1,
            nombreArchivo1,
            tipoArchivo2,
            nombreArchivo2,
            tipoArchivo3,
            nombreArchivo3,
            tipoArchivo4,
            nombreArchivo4,
            tipoArchivo5,
            nombreArchivo5,
        });

        await newVigilancia.save();
        res.status(200).json({ status: '1', msg: 'Vigilancia created' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error creating vigilancia', error: error.message });
    }
};

// Obtener una vigilancia por ID
vigilanciaCtrl.getVigilancia = async (req, res) => {
    try {
        const vigilancia = await Vigilancia.findById(req.params.id)
            .populate('persona', 'nombre')
            .populate('funcionario', 'cargo')
            .populate('juridiccion', 'juridiccion');
        res.status(200).json(vigilancia);
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error fetching vigilancia', error: error.message });
    }
};

// Editar una vigilancia
vigilanciaCtrl.editVigilancia = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            unidad_solicitante,
            objetivo, 
            cant_dias, 
            fecha_inicio, 
            fecha_fin, 
            destino, 
            latitud, 
            longitud, 
            turno_asignado, 
            persona, 
            funcionario, 
            juridiccion, 
            vigilancia, 
            recurso, 
            prioridad, 
            observaciones, 
            activo, 
            motivo_custodia,
            archivo, 
            archivo1,
            archivo2,
            archivo3,
            archivo4,
            archivo5, 
            tipoArchivo,
            nombreArchivo,
            tipoArchivo1,
            nombreArchivo1,
            tipoArchivo2,
            nombreArchivo2,
            tipoArchivo3,
            nombreArchivo3,
            tipoArchivo4,
            nombreArchivo4,
            tipoArchivo5,
            nombreArchivo5,
        } = req.body;

        await Vigilancia.findByIdAndUpdate(id, {
            unidad_solicitante,
            objetivo,
            cant_dias,
            fecha_inicio,
            fecha_fin,
            destino,
            latitud,
            longitud,
            turno_asignado,
            persona,
            funcionario: funcionario || null, // Asigna null si funcionario no está presente
            juridiccion,
            vigilancia,
            recurso,
            prioridad,
            observaciones,
            activo,
            motivo_custodia,
            archivo,
            archivo1,
            archivo2,
            archivo3,
            archivo4,
            archivo5, 
            tipoArchivo,
            nombreArchivo, // Actualiza el nombre del archivo
            tipoArchivo1,
            nombreArchivo1,
            tipoArchivo2,
            nombreArchivo2,
            tipoArchivo3,
            nombreArchivo3,
            tipoArchivo4,
            nombreArchivo4,
            tipoArchivo5,
            nombreArchivo5,
        });

        res.status(200).json({ status: '1', msg: 'Vigilancia updated' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error updating vigilancia', error: error.message });
    }
};

// Eliminar una vigilancia
vigilanciaCtrl.deleteVigilancia = async (req, res) => {
    try {
        await Vigilancia.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: '1', msg: 'Vigilancia deleted' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error deleting vigilancia', error: error.message });
    }
};

module.exports = vigilanciaCtrl;
