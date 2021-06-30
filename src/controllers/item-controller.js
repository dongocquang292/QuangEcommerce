const db = require("../models/index");
const Item = db.item;


const createItem = async (req, res) => {
    try {
        const itemName = req.body.itemname;
        const findItem = await Item.findOne({ where: { itemname: itemName } });

        if (!findItem) {
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
            const createItem = await Item.create(item);
            res.status(200).send(createItem)
        }
        else {
            res.status(400).send("Ttem already exist!")
        }
    } catch (error) {
        return res.status(400).send(error)
    }

}

const getItem = async (req, res) => {
    try {
        const item = await Item.findAll();
        res.status(200).send(item)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getItemId = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Item.findOne({ where: { id: id } });
        res.status(200).send(item)
    } catch (error) {
        res.status(400).send(error)
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
        res.status(200).send("Update success");

    } catch (error) {
        res.status(400).send(error)
    }
}

const deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        await Item.destroy({ where: { id: id } });
        res.status(200).send("Deleted")

    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    createItem, getItem, getItemId, updateItem, deleteItem
}