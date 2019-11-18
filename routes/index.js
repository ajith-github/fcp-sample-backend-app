var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index')

router.post('/login', indexController.loginHandler)

module.exports = router;
