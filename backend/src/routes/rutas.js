const express = require('express');
const router = express.Router();

const {analisis}= require('../clases/analizando');




router.post('/analisis', analisis);


module.exports = router;