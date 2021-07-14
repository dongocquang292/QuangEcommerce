const { order, voucher } = require("../models/index");
const db = require("../models/index");
const OrderDetail = db.orderDetail;
const Order = db.order;
const Item = db.item;
const Voucher = db.voucher;
const createOrderDetail = async (req, res) => {
    try {
        const itemId = req.body.itemId;
        const getItem = await Item.findOne({ where: { id: itemId } });
        const getItemPrice = getItem.price;

        const getItemName = getItem.itemName;
        const quantityOd = req.body.quantity;

        // update so luong trong kho
        const numberWare = getItem.numberWare;
        const updateNumberWare = numberWare - quantityOd;
        await Item.update({ numberWare: updateNumberWare }, { where: { id: itemId } });


        const orderDT = {
            quantity: quantityOd,
            price: getItemPrice,
            itemName: getItemName,
            orderId: req.body.orderId
        }
        const createOD = await OrderDetail.create(orderDT);
        const getInfoPriceQuantity = await OrderDetail.findAll({ where: { orderId: orderDT.orderId } },);

        const totalPriceFormOD = getInfoPriceQuantity.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
        // lay codeVoucher tu bang order
        const findCodeVoucher = await Order.findOne({ attributes: ['codeVoucher'] }, { where: { id: orderDT.orderId } });
        if (findCodeVoucher) {

            const searchVoucher = await Voucher.findOne({ attributes: ['discount', 'startTime', 'stopTime', 'quantity'] }, { where: { code: findCodeVoucher.codeVoucher } });;
            if (searchVoucher) {

                if (Date.parse(searchVoucher.startTime) <= Date.now() && Date.parse(searchVoucher.stopTime) >= Date.now() && searchVoucher.quantity > 0) {
                    const priceUpdateOrderHaveVoucher = totalPriceFormOD - ((totalPriceFormOD * searchVoucher.discount) / 100);
                    await Order.update({ totalPrice: priceUpdateOrderHaveVoucher }, { where: { id: orderDT.orderId } });
                } else {

                    await Order.update({ totalPrice: totalPriceFormOD }, { where: { id: orderDT.orderId } });
                }

            } else {

                await Order.update({ totalPrice: totalPriceFormOD }, { where: { id: orderDT.orderId } });
            }
        } else {
            await Order.update({ totalPrice: totalPriceFormOD }, { where: { id: orderDT.orderId } });

        }
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
            include: [{ model: Item, attributes: ['price', 'itemName'] }],
            limit: size,
            offset: page * size,

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
        const orderDT = await OrderDetail.findOne({ include: [{ model: Item, attributes: ['price', 'itemName'] }] }, { where: { id: id } });
        res.status(200).send(orderDT)
    } catch (error) {
        res.status(400).send(error)
    }
};

const updateOrderDetail = async (req, res) => {
    try {
        const itemId = req.body.itemId;
        const id = req.params.id;
        const getItem = await Item.findOne({ where: { id: itemId } });
        const getItemPrice = getItem.price;
        const getItemName = getItem.itemName;
        const orderDT = {
            quantity: req.body.quantity,
            orderId: req.body.orderId,
            price: getItemPrice,
            itemName: getItemName
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