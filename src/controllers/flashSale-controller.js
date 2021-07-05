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

            let createFS = await FlashSale.create(fls);
            res.status(200).send(createFS)

            // nhập id các items được flashSale
            const idItems = req.body.idItems;
            const timeNow = new Date();
            const getTimeNow = timeNow.getFullYear() + '-' + (timeNow.getMonth() + 1) + '-' + timeNow.getDate() + ' ' + timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds();
            if (fls.startTime <= getTimeNow && fls.stopTime >= getTimeNow) {
                idItems.forEach(async (element) => {

                    const id = element;
                    const getItems = await Item.findOne({ where: { id: id } })
                    const prePrice = getItems.price;
                    const priceDiscount = prePrice - ((prePrice * createFS.discount) / 100);

                    await Item.update({ priceDiscount: priceDiscount }, { where: { id: id } })
                });
            }
        } else {
            res.send("flash sale already exist")
        }
    } catch (error) {
        return res.status(400).send(error)
    }

}

const getFlashSale = async (req, res) => {
    try {
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);

        let page = 0;
        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber;
        }
        let size = 2;

        if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
            size = sizeAsNumber;
        }
        const flashSale = await FlashSale.findAndCountAll({
            limit: size,
            offset: page * size
        });
        res.status(200).send({
            content: flashSale.rows,
            totalPages: Math.ceil(flashSale.count / size)
        })
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