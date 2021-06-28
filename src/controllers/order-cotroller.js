const db = require("../models/index");
const Order = db.order;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
dotenv.config();

// const createItem = async (req, res) => {
//     try {
//         const itemname = req.body.itemname;
//         const findItem = await Item.findOne({ where: { itemname: itemname } });

//         if (!findItem) {
//             const item = {
//                 id: req.body.id,
//                 itemname: req.body.itemname,
//                 barcode: req.body.barcode,
//                 importPrice: req.body.importPrice,
//                 price: req.body.price,
//                 weight: req.body.weight,
//                 thumbnail: req.body.thumbnail,
//                 image: req.body.image,
//                 description: req.body.description,
//                 numberWare: req.body.numberWare,
//             }
//             const creItem = await Item.create(item);
//             res.send(creItem)
//         } else {
//             res.send("da ton tai item")
//         }
//     } catch (error) {
//         return res.send("Khong tao duoc item")
//     }

// }

// const getItem = async (req, res) => {
//     try {
//         const item = await Item.findAll();
//         res.send(item)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// }

// const getItemId = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const item = await Item.findOne({ where: { id: id } });
//         res.send(item)
//     } catch (error) {
//         res.send(error);
//     }
// };

// const updateItem = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const item = {
//             itemname: req.body.itemname,
//             barcode: req.body.barcode,
//             importPrice: req.body.importPrice,
//             price: req.body.price,
//             weight: req.body.weight,
//             thumbnail: req.body.thumbnail,
//             image: req.body.image,
//             description: req.body.description,
//             numberWare: req.body.numberWare,
//         }
//         await Item.update(item, { where: { id: id } });
//         res.send("update thanh cong");

//     } catch (error) {
//         res.send(error);
//     }
// }

// const deleteItem = async (req, res) => {
//     try {
//         const id = req.params.id;
//         await Item.destroy({ where: { id: id } });
//         res.send("Da xoa")

//     } catch (error) {
//         res.send(error)
//     }
// }

module.exports = {

}