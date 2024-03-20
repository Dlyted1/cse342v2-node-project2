const express = require('express');
const cors = require('cors');
const router = express.Router();

// router.get('/', (req, res) => { res.send('Hello World'); });

// router.get

router.use('/', require('./swagger'));
router.use('/horses', require('./horses'));
// router.use('/owners', require('./owners'));

module.exports = router;