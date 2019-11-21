var express = require('express');
var router = express.Router();

let queueController = require('../controllers/queue')

router.post('/message', queueController.sendMessageHandler)
router.post('/delete', queueController.deleteHandler)

module.exports = router;