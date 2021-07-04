const db = require("../models/index");
const OrderDetail = db.orderDetail;


const createOrderDetail = async (req, res) => {
    try {
        const orderDT = {
            price: req.body.price,
            quantity: req.body.quantity,
        }
        const createOD = await OrderDetail.create(orderDT);
        res.status(200).send(createOD)

    } catch (error) {
        return res.status(400).send(error)
    }

}

const getOrderDetail = async (req, res) => {
    try {
        const orderDT = await OrderDetail.findAll();
        res.status(200).send(orderDT)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getOrderDetailId = async (req, res) => {
    try {
        const id = req.params.id;
        const orderDT = await OrderDetail.findOne({ where: { id: id } });
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