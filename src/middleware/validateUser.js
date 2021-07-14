const Joi = require('joi');

const validateUserRegister = async (req, res, next) => {
    try {
        const schemaUser = Joi.object().keys({
            username: Joi.string()
                .min(3)
                .max(30)
                .required()
                .error(err => { err[0].message = "Username must more than 3 and less than 30 characters"; return err; }),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required()
                .error(err => { err[0].message = "Wrong format password"; return err; }),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'vn'] } })
                .required()
                .error(err => { err[0].message = "Wrong format email, email must be @.com or @.vn"; return err; }),
            address: Joi.string()
                .required()
                .error(err => { err[0].message = "Require input address"; return err; }),
            phonenumber: Joi.number()
                .required()
                .error(err => { err[0].message = "Require input phonenumber"; return err; }),
        });

        const data = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            address: req.body.address,
            phonenumber: req.body.phonenumber
        }
        const options = { abortEarly: false };
        const value = await schemaUser.validate(data, options);
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

const validateUserLogin = async (req, res, next) => {
    try {
        const schemaUserLogin = Joi.object().keys({
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required()
                .error(err => { err[0].message = "Wrong format password"; return err; }),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'vn'] } })
                .required()
                .error(err => { err[0].message = "Wrong format email, email must be @.com or @.vn"; return err; }),
        });
        const data = {
            password: req.body.password,
            email: req.body.email,
        }
        const options = { abortEarly: false };
        const value = await schemaUserLogin.validate(data, options);
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
    validateUserRegister, validateUserLogin,
}