const Joi = require('joi');

const schemaUser = Joi.object().keys({
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .error(err => { err[0].message = "Error Username"; return err; }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .error(err => { err[0].message = "Error password"; return err; }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .error(err => { err[0].message = "Error email"; return err; }),
    address: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required()
        .error(err => { err[0].message = "Error address"; return err; }),
    phonenumber: Joi.string()
        .alphanum()
        .min(10)
        .max(11)
        .required()
        .error(err => { err[0].message = "Error phonenumber"; return err; }),
});

module.exports = {
    schemaUser
}
