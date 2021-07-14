const db = require("../models/index");
const Image = db.image;


const createImage = async (req, res) => {
    try {
        const createImg = {
            img: req.file.path,
            itemId: req.body.itemId
        }
        const findImg = await Image.findOne({ where: { img: createImg.img } });
        if (!findImg) {
            const createImage = await Image.create(createImg)
            return res.status(200).send(createImage);
        } else {
            res.send("already exist")
        }
    } catch (error) {
        return res.send(error)
    }

}

const getImage = async (req, res) => {
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
        const image = await Image.findAndCountAll({
            limit: size,
            offset: page * size
        });
        res.status(200).send({
            content: image.rows,
            totalPages: Math.ceil(image.count / size)
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

const getImageId = async (req, res) => {
    try {
        const id = req.params.id;
        const image = await Image.findOne({ where: { id: id } });
        res.status(200).send(image)
    } catch (error) {
        res.send(error);
    }
};

const updateImage = async (req, res) => {
    try {
        const updateImg = {
            img: req.body.img,
            itemId: req.body.itemId
        }
        const id = req.params.id;
        await Image.update(updateImg, { where: { id: id } });
        res.status(200).send("Update success");
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteImage = async (req, res) => {
    try {
        const id = req.params.id;
        await Image.destroy({ where: { id: id } });
        res.status(200).send("Deleted")

    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    createImage, getImage, getImageId, updateImage, deleteImage
}