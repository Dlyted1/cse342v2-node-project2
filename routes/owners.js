const express = require('express');
const router = express.Router();

const ownersController = require('../controllers/owners');
const validation = require('../middleware/validate');

router.get('/', ownersController.getAll);

router.get('/:id', ownersController.getSingle);

router.post('/', validation.saveOwner, ownersController.createOwner);

router.put('/:id', validation.saveOwner, ownersController.updateOwner);

router.delete('/:id', ownersController.deleteOwner);

module.exports = router;