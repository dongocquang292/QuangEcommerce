const db = require("../models/index");
const Order = db.order;
const OrderDetail = db.orderDetail;
const Item = db.item;
const User = db.user;
const Voucher = db.voucher;


const createOrder = async (req, res) => {
    try {
        const order = {
            userId: req.body.userId,
            orderDetailId: req.body.orderDetailId,
            codeVoucher: req.body.codeVoucher,
        }
        // tru di so luong voucher
        const findVoucher = await Voucher.findOne({ attributes: ['quantity'] }, { where: { code: order.codeVoucher } });
        if (findVoucher) {
            const quantityAfterUse = findVoucher.quantity - 1;
            await Voucher.update({ quantity: quantityAfterUse }, { where: { code: order.codeVoucher } })
        }
        const createOrder = await Order.create(order);
        res.status(200).send(createOrder)
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
            include: [{ model: OrderDetail, attributes: ['price'] }],
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
        const order = await Order.findOne({ include: [{ model: OrderDetail, attributes: ['price', 'quantity', 'itemName'] }] }, { where: { id: id } });

        res.status(200).send(order)
    } catch (error) {
        res.status(400).send(error)
    }
};


// const updateOrder = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const order = {
//             trackingNumber: req.body.trackingNumber,
//             priceLast: req.body.priceLast,
//         }
//         await Order.update(order, { where: { id: id } });
//         res.status(200).send("Update success");

//     } catch (error) {
//         res.status(400).send(error)
//     }
// }

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
    createOrder, getOrder, getOrderId, deleteOrder
}