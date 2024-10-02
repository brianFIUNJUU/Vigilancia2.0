const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // La carpeta donde se almacenarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único del archivo
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
