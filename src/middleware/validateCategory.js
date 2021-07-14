const Joi = require('joi');

const validateCreateCategory = async (req, res, next) => {
    try {
        const schemaCategory = Joi.object().keys({
            categoryName: Joi.string()
                .min(3)
                .max(30)
                .required()
                .error(err => { err[0].message = "CategoryName must more than 3 and less than 30 characters"; return err; }),
            location: Joi.number()
                .required()
                .error(err => { err[0].message = "Require input location, must be number"; return err; }),
            status: Joi.number()
                .required()
                .error(err => { err[0].message = "Require input status, must be number"; return err; }),
        });

        const data = {
            categoryName: req.body.categoryName,
            location: req.body.location,
            status: req.body.status
        }
        const options = { abortEarly: false };
        const value = await schemaCategory.validate(data, options);
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
    validateCreateCategory
}