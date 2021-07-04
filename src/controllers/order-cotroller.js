const db = require("../models/index");
const Order = db.order;


const createOrder = async (req, res) => {
    try {
        const order = {
            trackingNumber: req.body.trackingNumber
        }
        const createOD = await Order.create(order);
        res.status(200).send(createOD)

    } catch (error) {
        return res.status(400).send(error)
    }
}

const getOrder = async (req, res) => {
    try {
        const order = await Order.findAll();
        res.status(200).send(order)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getOrderId = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findOne({ where: { id: id } });
        res.status(200).send(order)
    } catch (error) {
        res.status(400).send(error)
    }
};

const updateOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const order = {
            trackingNumber: req.body.trackingNumber
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