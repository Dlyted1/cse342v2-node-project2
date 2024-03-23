const express = require('express');
// const cors = require('cors');
const router = express.Router();
const passport = require('passport');

// router.get('/', (req, res) => { res.send('Hello World'); });
// router.get

router.use('/', require('./swagger'));
router.use('/horses', require('./horses'));
router.use('/owners', require('./owners'));

router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;