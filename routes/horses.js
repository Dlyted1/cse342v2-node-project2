const express = require('express');
const router = express.Router();

const horsesController = require('../controllers/horses');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Define routes without authentication middleware
router.get('/', horsesController.getAll);
router.get('/:id', horsesController.getSingle);

// Define routes with authentication middleware
router.post('/', isAuthenticated, validation.saveHorse, horsesController.createHorse);
router.put('/:id', isAuthenticated, validation.saveHorse, horsesController.updateHorse);
router.delete('/:id', isAuthenticated, horsesController.deleteHorse);

module.exports = router;
