const valiUser = require("../validate/validateUser");
const valiItem = require('../validate/validateItem');
const valiUserLogin = require('../validate/validateUserLogin');
const validateUser = async (req, res, next) => {
    try {
        const data = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            address: req.body.address,
            phonenumber: req.body.phonenumber
        }
        const options = { abortEarly: false };
        const value = await valiUser.schemaUser.validate(data, options);
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
        const data = {
            password: req.body.password,
            email: req.body.email,
        }
        const options = { abortEarly: false };
        const value = await valiUserLogin.schemaUserLogin.validate(data, options);
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
const validateItem = async (req, res, next) => {
    try {

        const data = {
            itemname: req.body.itemname,
            barcode: req.body.barcode,
            importPrice: req.body.importPrice,
            price: req.body.price,
            weight: req.body.weight,
            description: req.body.description,
            numberWare: req.body.numberWare,
        }

        const options = { abortEarly: false };
        const value = await valiItem.schemaItem.validate(data, options);
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
    validateUser, validateItem, validateUserLogin
}