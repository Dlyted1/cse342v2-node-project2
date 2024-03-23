const express = require('express');
const router = express.Router();

const ownersController = require('../controllers/owners');
const validation = require('../middleware/validate');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', ownersController.getAll);
router.get('/:id', ownersController.getSingle);
router.post('/', validation.saveOwner, ownersController.createOwner);
router.put('/:id', validation.saveOwner, ownersController.updateOwner);
router.delete('/:id', ownersController.deleteOwner);

router.post('/', isAuthenticated, ownersController.createOwner);
router.put('/:id', isAuthenticated, ownersController.updateOwner);
router.delete('/:id', isAuthenticated, ownersController.deleteOwner);

module.exports = router;