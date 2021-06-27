const db = require("../models/index");
const Category = db.category;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
dotenv.config();

const createCategory = async (req, res) => {
    try {
        const category = {
            categoryName: req.body.categoryName,
            status: req.body.status
        }
        const createCate = await Category.create(category);
        res.json(createCate)
    } catch (error) {
        return res.send("Khong tao duoc Category")
    }

}

const getCategory = async (req, res) => {
    try {
        const category = await Category.findAll();
        res.send(category)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getCategoryId = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findOne(req.body, { where: { id: id } });
        res.send(category)
    } catch (error) {
        res.send(error);
    }
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOne(req.body, { where: { id: id } });
        await user.update(req.body, { where: { id: id } });
        res.send(user);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByPK(req.body, { where: { id: id } });
        await user.destroy();
        res.send("Da xoa")

    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    createCategory, getCategory, getCategoryId
}