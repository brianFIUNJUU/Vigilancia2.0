const Turno = require('../models/turno'); // Asegúrate de que la ruta al modelo sea correcta
const Vigilancia = require('../models/vigilancia');

const turnoCtrl = {};

// Obtener todos los turnos
turnoCtrl.getTurnos = async (req, res) => {
  try {
    const turnos = await Turno.find()
      .populate('personal', 'nombre') // Ajusta el campo que deseas devolver
      .populate('vigilancia', 'objetivo'); // Ajusta el campo que deseas devolver
    res.status(200).json(turnos);
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error fetching turnos', error: error.message });
  }
};

// Crear un nuevo turno
turnoCtrl.createTurno = async (req, res) => {
  try {
    const { horainicio, horafin, fechainicio, fechafin, observaciones, activo, personal, vigilancia } = req.body;

    // Crear el nuevo turno
    const newTurno = new Turno({ horainicio, horafin, fechainicio, fechafin, observaciones, activo, personal, vigilancia });
    await newTurno.save();

    // Actualizar el campo 'turno_asignado' en Vigilancia
    await Vigilancia.findByIdAndUpdate(vigilancia, { turno_asignado: true });

    res.status(200).json({ status: '1', msg: 'Turno creado y vigilancia actualizada' });
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error creando turno', error: error.message });
  }
};

// Obtener un turno por ID
turnoCtrl.getTurno = async (req, res) => {
  try {
    const turno = await Turno.findById(req.params.id)
      .populate('personal', 'nombre') // Ajusta el campo que deseas devolver
      .populate('vigilancia', 'objetivo'); // Ajusta el campo que deseas devolver
    if (!turno) {
      return res.status(404).json({ status: '0', msg: 'Turno not found' });
    }
    res.status(200).json(turno);
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error fetching turno', error: error.message });
  }
};

// Editar un turno
turnoCtrl.editTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const { horainicio, horafin, fechainicio, fechafin, observaciones, activo, personal, vigilancia } = req.body;
    await Turno.findByIdAndUpdate(id, { horainicio, horafin, fechainicio, fechafin, observaciones, activo, personal, vigilancia });
    res.status(200).json({ status: '1', msg: 'Turno updated' });
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error updating turno', error: error.message });
  }
};

// Eliminar un turno
turnoCtrl.deleteTurno = async (req, res) => {
  try {
    await Turno.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: '1', msg: 'Turno deleted' });
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error deleting turno', error: error.message });
  }
};

module.exports = turnoCtrl;
