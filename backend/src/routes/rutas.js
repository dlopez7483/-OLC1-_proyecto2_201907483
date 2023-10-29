const express = require('express');
const router = express.Router();

const {analisis}= require('../clases/analizando');
const {errores}= require('../clases/errores_mostrar');



router.post('/analisis', analisis);
router.get('/errores', errores);

module.exports = router;