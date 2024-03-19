const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/horses');
const validation = require('../middleware/validate');

router.get('/', horsessController.getAll);

router.get('/:id', horsesController.getSingle);

router.post('/', validation.saveHorse, horsesController.createHorse);

router.put('/:id', validation.saveHorse, horsesController.updateHorse);

router.delete('/:id', horsesController.deleteHorse);

module.exports = router;