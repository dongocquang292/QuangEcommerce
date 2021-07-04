const db = require("../models/index");
const { get } = require("../routes/item.route");
const { createItem } = require("./item-controller");
const FlashSale = db.flashSale;
const Item = db.item;
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

            const idItems = req.body.idItems;
            if (Date.parse(createFS.startTime) > Date.parse(createFS.stopTime)) {

            }

            const setPrice = idItems.forEach(async (element) => {
                const id = element;
                const getItems = await Item.findOne({ where: { id: id } })
                const prePrice = getItems.price
                const priceDiscount = prePrice - ((prePrice * createFS.discount) / 100);
                await Item.update({ priceDiscount: priceDiscount }, { where: { id: id } })
            });


        } else {
            res.send("flash sale already exist")
        }
    } catch (error) {
        return res.status(400).send(error)
    }

}

const getFlashSale = async (req, res) => {
    try {
        const flasSale = await FlashSale.findAll();
        res.status(200).send(flasSale)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getFlashSaleId = async (req, res) => {
    try {
        const id = req.params.id;
        const flashSale = await FlashSale.findOne({ where: { id: id } });
        res.status(200).send(flashSale)
    } catch (error) {
        res.status(400).send(error);
    }
};

const updateFlashSale = async (req, res) => {
    try {
        const id = req.params.id;
        const flashSale = {
            flashSaleName: req.body.flashSaleName,
            amount: req.body.amount,
            startTime: req.body.starttime,
            stopTime: req.body.stopTime,
            discount: req.body.discount,
        }
        const update = await FlashSale.update(flashSale, { where: { id: id } });
        res.status(200).send("update success");

    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteFlashSale = async (req, res) => {
    try {
        const id = req.params.id;
        await FlashSale.destroy({ where: { id: id } });
        res.status(200).send("Deleted")

    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    createFlashSale, getFlashSale, getFlashSaleId, updateFlashSale, deleteFlashSale,
}