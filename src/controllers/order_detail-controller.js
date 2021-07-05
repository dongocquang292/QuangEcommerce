const db = require("../models/index");
const OrderDetail = db.orderDetail;
const Order = db.order;

const createOrderDetail = async (req, res) => {
    try {
        const orderDT = {
            price: req.body.price,
            quantity: req.body.quantity,
            orderId: req.body.orderId,
        }
        const createOD = await OrderDetail.create(orderDT);
        res.status(200).send(createOD)

    } catch (error) {
        return res.status(400).send(error)
    }

}

const getOrderDetail = async (req, res) => {
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
        const orderDT = await OrderDetail.findAndCountAll({
            limit: size,
            offset: page * size
        });
        res.status(200).send({
            content: orderDT.rows,
            totalPages: Math.ceil(orderDT.count / size)
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

const getOrderDetailId = async (req, res) => {
    try {
        const id = req.params.id;
        const orderDT = await OrderDetail.findOne({ include: [{ model: Order }] }, { where: { id: id } });
        res.status(200).send(orderDT)
    } catch (error) {
        res.status(400).send(error)
    }
};

const updateOrderDetail = async (req, res) => {
    try {
        const id = req.params.id;
        const orderDT = {
            price: req.body.price,
            quantity: req.body.quantity,
            orderId: req.body.orderId
        }
        await OrderDetail.update(orderDT, { where: { id: id } });
        res.status(200).send("Update success");

    } catch (error) {
        res.status(400).send(error)
    }
}

const deleteOrderDetail = async (req, res) => {
    try {
        const id = req.params.id;
        await OrderDetail.destroy({ where: { id: id } });
        res.status(200).send("Deleted")

    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    createOrderDetail, getOrderDetail, getOrderDetailId, updateOrderDetail, deleteOrderDetail
}