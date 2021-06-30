const Joi = require('joi');

const schemaUserLogin = Joi.object().keys({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .error(err => { err[0].message = "Error password"; return err; }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .error(err => { err[0].message = "Error email"; return err; }),
});

module.exports = {
    schemaUserLogin
}
