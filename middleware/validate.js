const validator = require('../helpers/validate');

const saveHorse = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        breed: 'required|string',
        coloring: 'required|string',
        gender: 'required|string',
        birthday: 'string',
        discipline: 'string',
        vet: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveHorse
};