const express = require('express');
const router = express.Router();

const horsesController = require('../controllers/horses');
// const validation = require('../middleware/validate');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', horsesController.getAll);
router.get('/:id', horsesController.getSingle);
// router.post('/', validation.saveHorse, horsesController.createHorse);
// router.put('/:id', validation.saveHorse, horsesController.updateHorse);
// router.delete('/:id', horsesController.deleteHorse);

router.post('/', isAuthenticated, horsesController.createHorse);
router.put('/:id', isAuthenticated, horsesController.updateHorse);
router.delete('/:id', isAuthenticated, horsesController.deleteHorse);

module.exports = router;
