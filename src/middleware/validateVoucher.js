const Joi = require('joi');

const validateCreateVoucher = async (req, res, next) => {
    try {
        const schemaVoucher = Joi.object().keys({
            code: Joi.string()
                .min(3)
                .max(15)
                .required()
                .error(err => { err[0].message = "Code must more than 3 and less than 15 characters"; return err; }),
            quantity: Joi.number()
                .required()
                .error(err => { err[0].message = "Require input quantity, must be number"; return err; }),
            discount: Joi.number()
                .required()
                .error(err => { err[0].message = "Require input discount, must be number"; return err; }),
            startTime: Joi.string()
                .required()
                .error(err => { err[0].message = "Require input startTime"; return err; }),
            stopTime: Joi.string()
                .required()
                .error(err => { err[0].message = "Require input stopTime"; return err; }),
        });

        const data = {
            code: req.body.code,
            quantity: req.body.quantity,
            discount: req.body.discount,
            startTime: req.body.startTime,
            stopTime: req.body.stopTime,
        }
        const options = { abortEarly: false };
        const value = await schemaVoucher.validate(data, options);
        if (value.error) {
            res.status(400).send(value.error.message);
        }
        else {
            return next()
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    validateCreateVoucher
}