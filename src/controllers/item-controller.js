const db = require("../models/index");
const Item = db.item;
const OrderDetail = db.orderDetail;
const Img = db.image;
const createItem = async (req, res) => {
    try {
        const itemName = req.body.itemName;
        const findItem = await Item.findOne({ where: { itemName: itemName } });
        if (!findItem) {
            const item = {
                itemName: req.body.itemName,
                barcode: req.body.barcode,
                importPrice: req.body.importPrice,
                price: req.body.price,
                weight: req.body.weight,
                thumbnail: req.file.path,
                image: req.body.image,
                description: req.body.description,
                numberWare: req.body.numberWare,
                orderDetailId: req.body.orderDetailId,
                categoryId: req.body.categoryId,
                flashSaleId: req.body.flashSaleId
            }
            const createItem = await Item.create(item);
            res.status(200).send(createItem)
        }
        else {
            res.status(400).send("Item already exist!")
        }
    } catch (error) {
        return res.status(400).send(error)
    }

}

const getItem = async (req, res) => {
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

        const item = await Item.findAndCountAll({
            limit: size,
            offset: page * size
        });
        res.status(200).send({
            content: item.rows,
            totalPages: Math.ceil(item.count / size)
        })
    } catch (error) {
        res.status(400).send(error)
    }
}
const sortItemAlphabe = async (req, res) => {
    try {
        const item = await Item.findAll()
        res.send(item)
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
            itemName: req.body.itemName,
            barcode: req.body.barcode,
            importPrice: req.body.importPrice,
            price: req.body.price,
            weight: req.body.weight,
            thumbnail: req.file.path,
            image: req.body.image,
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

const getImgOfItem = async (req, res) => {
    try {
        const id = req.params.id;
        const getItem = await Item.findOne({ where: { id: id } });
        const getIdImg = getItem.image;
        const arrId = Array.from(getIdImg.split(','), Number);
        let i = 0;
        let len = arrId.length;
        let linkImg = "";
        for (; i < len; i++) {
            const id = arrId[i];
            const Image = await Img.findOne({ where: { id: id } });
            const img = Image.img;
            linkImg += img + ', ';
        }
        res.status(200).send("Link Image: " + linkImg)
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    createItem, getItem, getItemId, updateItem, deleteItem, sortItemAlphabe, getImgOfItem
}