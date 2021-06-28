const db = require("../models/index");
const Item = db.item;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
dotenv.config();


const createItem = async (req, res) => {
    try {
        const itemName = req.body.itemname;
        const findItem = await Item.findOne({ where: { itemname: itemName } });
        ;
        if (findItem == null) {

            const item = {
                id: req.body.id,
                itemname: req.body.itemname,
                barcode: req.body.barcode,
                importPrice: req.body.importPrice,
                price: req.body.price,
                weight: req.body.weight,
                thumbnail: req.body.thumbnail,
                image: req.file.path,
                description: req.body.description,
                numberWare: req.body.numberWare,
            }
            const createItem = await Item.create(item);
            res.send(createItem)
        }
        else {
            res.send("da ton tai item")
        }
    } catch (error) {
        return res.send("Khong tao duoc item")
    }

}

const getItem = async (req, res) => {
    try {
        const item = await Item.findAll();
        res.send(item)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getItemId = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Item.findOne({ where: { id: id } });
        res.send(item)
    } catch (error) {
        res.send(error);
    }
};

const updateItem = async (req, res) => {
    try {
        const id = req.params.id;
        const item = {
            itemname: req.body.itemname,
            barcode: req.body.barcode,
            importPrice: req.body.importPrice,
            price: req.body.price,
            weight: req.body.weight,
            thumbnail: req.body.thumbnail,
            image: req.file.path,
            description: req.body.description,
            numberWare: req.body.numberWare,
        }
        await Item.update(item, { where: { id: id } });
        res.send("update thanh cong");

    } catch (error) {
        res.send(error);
    }
}

const deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        await Item.destroy({ where: { id: id } });
        res.send("Da xoa")

    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    createItem, getItem: getItem, getItemId, updateItem, deleteItem
}