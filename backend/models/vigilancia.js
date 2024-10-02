const mongoose = require("mongoose");
const { Schema } = mongoose;

const VigilanciaSchema = new Schema({
    unidad_solicitante:{type: String},
    objetivo: { type: String, required: true },
    cant_dias: { type: Number, required: true },
    fecha_inicio: { type: Date, required: true },
    fecha_fin: { type: Date, required: true },
    destino: { type: String, required: true },
    latitud: { type: String, required: true },
    longitud: { type: String, required: true },
    turno_asignado: { type: Boolean, required: true, default: false },
    persona: { type: Schema.Types.ObjectId, ref: 'Persona', required: true },
    funcionario: { type: Schema.Types.ObjectId, ref: 'Funcionario' },
    juridiccion: { type: Schema.Types.ObjectId, ref: 'Dependencia', required: true },
    vigilancia: { type: String},
    recurso: { type: String },
    prioridad: { type: String },
    observaciones: { type: String, required: true },
    activo: { type: Boolean, required: true, default: true },
    motivo_custodia: { type: String, required: true},

    archivo: { type: String }, // Contenido del archivo en base64
    tipoArchivo: { type: String }, // MIME type del archivo
    nombreArchivo: { type: String }, // Nombre del archivo
  
    archivo1: { type: String}, // Contenido del archivo en base64
    tipoArchivo1: { type: String }, // MIME type del archivo
    nombreArchivo1: { type: String }, // Nombre del archivo

    archivo2: { type: String}, // Contenido del archivo en base64
    tipoArchivo2: { type: String }, // MIME type del archivo
    nombreArchivo2: { type: String }, // Nombre del archivo

    archivo3: { type: String}, // Contenido del archivo en base64
    tipoArchivo3: { type: String }, // MIME type del archivo
    nombreArchivo3: { type: String }, // Nombre del archivo

    archivo4: { type: String}, // Contenido del archivo en base64
    tipoArchivo4: { type: String }, // MIME type del archivo
    nombreArchivo4: { type: String }, // Nombre del archivo
    
    archivo5: { type: String}, // Contenido del archivo en base64
    tipoArchivo5: { type: String }, // MIME type del archivo
    nombreArchivo5: { type: String }, // Nombre del archivo
  
  
});

module.exports = mongoose.model('Vigilancia', VigilanciaSchema);
