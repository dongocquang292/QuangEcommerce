const db = require("../models/index");
const Order = db.order;
const OrderDetail = db.orderDetail;
const Item = db.item;
const User = db.user;
const createOrder = async (req, res) => {
    try {
        const order = {
            userId: req.body.userId,
            itemId: req.body.itemId,
            orderDetailId: req.body.orderDetailId,
        }
        const getPrice = await Item.findOne({ include: [{ model: Item, attributes: ['price'] }] }, { where: { id: order.itemId } });
        const getQuantity = await OrderDetail.findOne({ include: [{ model: OrderDetail, attributes: ['quantity'] }] }, { where: { id: order.orderDetailId } });
        const getInfoUser = await User.findOne({ include: [{ model: User, attributes: ['username', 'email', 'address', 'phonenumber'] }] }, { where: { id: order.userId } })
        const createOD = await Order.create(order);
        res.status(200).send(createOD)

    } catch (error) {
        return res.status(400).send(error)
    }
}

const getOrder = async (req, res) => {
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

        const order = await Order.findAndCountAll({
            limit: size,
            offset: page * size
        });
        res.status(200).send({
            content: order.rows,
            totalPages: Math.ceil(order.count / size)
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

const getOrderId = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findOne({ include: [{ model: OrderDetail, attributes: ['price'] }] }, { where: { id: id } });

        res.status(200).send(order)
    } catch (error) {
        res.status(400).send(error)
    }
};


const updateOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const order = {
            trackingNumber: req.body.trackingNumber,
            priceLast: req.body.priceLast,
        }
        await Order.update(order, { where: { id: id } });
        res.status(200).send("Update success");

    } catch (error) {
        res.status(400).send(error)
    }
}

const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        await Order.destroy({ where: { id: id } });
        res.status(200).send("Deleted")

    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    createOrder, getOrder, getOrderId, updateOrder, deleteOrder
}