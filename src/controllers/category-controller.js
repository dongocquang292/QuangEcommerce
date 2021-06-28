const db = require("../models/index");
const Category = db.category;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
dotenv.config();

const createCategory = async (req, res) => {
    try {
        const categoryName = req.body.categoryName;
        const findCategory = await Category.findOne({ where: { categoryName: categoryName } });
        if (!findCategory) {
            const category = {
                id: req.body.id,
                categoryName: req.body.categoryName,
                status: req.body.status
            }
            const createCate = await Category.create(category);
            res.send(createCate)
        } else {
            res.send("da ton tai category")
        }
        console.log(12);
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
        const category = await Category.findOne({ where: { id: id } });
        res.send(category)
    } catch (error) {
        res.send(error);
    }
};

const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = {
            categoryName: req.body.categoryName,
            status: req.body.status
        }
        const update = await Category.update(category, { where: { id: id } });
        res.send("update thanh cong");

    } catch (error) {
        res.send(error);
    }
}

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        await Category.destroy({ where: { id: id } });
        res.send("Da xoa")

    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    createCategory, getCategory, getCategoryId, updateCategory, deleteCategory
}