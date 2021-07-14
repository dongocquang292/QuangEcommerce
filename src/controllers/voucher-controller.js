const db = require("../models/index");
const Voucher = db.voucher;
const { Op } = require("sequelize");

const createVoucher = async (req, res) => {
    try {
        const code = req.body.code;
        const findVoucher = await Voucher.findOne({ where: { code: code } });
        if (!findVoucher) {
            const voucher = {
                code: req.body.code,
                quantity: req.body.quantity,
                discount: req.body.discount,
                startTime: req.body.startTime,
                stopTime: req.body.stopTime,
            }
            const createVoucher = await Voucher.create(voucher);
            res.status(200).send(createVoucher)
        } else {
            res.status(400).send("Voucher already exist")
        }

    } catch (error) {
        return res.send(error)
    }

}

const getVoucher = async (req, res) => {
    try {
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);

        let page = 0;
        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber;
        }
        let size = 3;

        if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
            size = sizeAsNumber;
        }
        const search = req.body.search;
        const voucher = await Voucher.findAndCountAll({
            limit: size,
            offset: page * size,
            where: { code: { [Op.like]: `%${search}%` } }, order: [
                ['code', 'ASC'],
            ]
        });
        res.status(200).send({
            content: voucher.rows,
            totalPages: Math.ceil(voucher.count / size)
        })
    } catch (error) {
        res.status(400).send(error)
    }
}


const getVoucherId = async (req, res) => {
    try {
        const id = req.params.id;
        const voucher = await Voucher.findOne({ where: { id: id } });
        res.status(200).send(voucher)
    } catch (error) {
        res.send(error);
    }
};

const updateVoucher = async (req, res) => {
    try {
        const id = req.params.id;
        const voucher = {
            code: req.body.code,
            quantity: req.body.quantity,
            discount: req.body.discount,
            startTime: req.body.startTime,
            stopTime: req.body.stopTime,
        }
        await Voucher.update(voucher, { where: { id: id } });
        res.status(200).send("Update success");

    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteVoucher = async (req, res) => {
    try {
        const id = req.params.id;
        await Voucher.destroy({ where: { id: id } });
        res.status(200).send("Deleted")

    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    createVoucher, getVoucher, getVoucherId, updateVoucher, deleteVoucher,
}