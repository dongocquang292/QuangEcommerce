const db = require("../models/index");
const FlashSale = db.flashSale;
const dotenv = require('dotenv');
const { query } = require("express");
dotenv.config();

const createFlashSale = async (req, res) => {
    try {
        const flashSaleName = req.body.flashSaleName;
        const findFlashSale = await FlashSale.findOne({ where: { flashSaleName: flashSaleName } });
        if (!findFlashSale) {
            const fls = {
                flashSaleName: req.body.flashSaleName,
                amount: req.body.amount,
                startTime: req.body.startTime,
                stopTime: req.body.stopTime,
                discount: req.body.discount,
            }
            const createFS = await FlashSale.create(fls);

            res.send(createFS)
        } else {
            res.send("da ton tai flash sale")
        }
    } catch (error) {
        return res.send("Khong tao duoc flash Sale")
    }

}

const getFlashSale = async (req, res) => {
    try {
        const flasSale = await FlashSale.findAll();
        res.send(flasSale)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getFlashSaleId = async (req, res) => {
    try {
        const id = req.params.id;
        const flashSale = await FlashSale.findOne({ where: { id: id } });
        res.send(flashSale)
    } catch (error) {
        res.send(error);
    }
};

const updateFlashSale = async (req, res) => {
    try {
        const id = req.params.id;
        const flashSale = {
            flashSaleName: req.body.flashSaleName,
            amount: req.body.amount,
            startTime: req.body.startTime,
            stopTime: req.body.stopTime,
            discount: req.body.discount,
        }
        const update = await FlashSale.update(flashSale, { where: { id: id } });
        res.send("update thanh cong");

    } catch (error) {
        res.send(error);
    }
}

const deleteFlashSale = async (req, res) => {
    try {
        const id = req.params.id;
        await FlashSale.destroy({ where: { id: id } });
        res.send("Da xoa")

    } catch (error) {
        res.send(error)
    }
}

const priceDiscount = async (req, res) => {
    try {
        const id = req.params.id;
        const flashSale = await FlashSale.findOne({ where: { id: id } });
        console.log(flashSale);
        const timeNow = Date.now();
    } catch (error) {
        res.send("Loi")
    }
}
module.exports = {
    createFlashSale, getFlashSale, getFlashSaleId, updateFlashSale, deleteFlashSale, priceDiscount
}