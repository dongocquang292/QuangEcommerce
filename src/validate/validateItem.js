const Joi = require('joi');

const schemaItem = Joi.object().keys({
    itemname: Joi.string()
        .required()
        .error(err => { err[0].message = "Error Itemname"; return err; }),
    barcode: Joi.string()
        .required()
        .error(err => { err[0].message = "Error barcode"; return err; }),
    importPrice: Joi.string()
        .required()
        .error(err => { err[0].message = "Error importPrice"; return err; }),
    price: Joi.number()
        .required()
        .error(err => { err[0].message = "Error price"; return err; }),
    weight: Joi.number()
        .required()
        .error(err => { err[0].message = "Error weight"; return err; }),
    thumbnail: Joi.string()
        .required()
        .error(err => { err[0].message = "Error thumbnail"; return err; }),
    image: Joi.string()
        .required()
        .error(err => { err[0].message = "Error image"; return err; }),
    description: Joi.string()
        .required()
        .error(err => { err[0].message = "Error description"; return err; }),
    numberWare: Joi.number()
        .required()
        .error(err => { err[0].message = "Error numberWare"; return err; }),
});

module.exports = {
    schemaItem
}
