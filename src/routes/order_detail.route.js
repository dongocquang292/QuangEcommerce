const orderDetailController = require("../controllers/order_detail-controller");
const auth = require('../middleware/authJwt');
const router = require("express").Router();

router.post("/createOD", auth.verifyToken, orderDetailController.createOrderDetail);
router.get("/getOD", auth.verifyToken, orderDetailController.getOrderDetail);
router.get("/getOD/:id", auth.verifyToken, orderDetailController.getOrderDetailId);
router.put("/updateOD/:id", auth.verifyToken, orderDetailController.updateOrderDetail);
router.delete("/deleteOD/:id", auth.verifyToken, orderDetailController.deleteOrderDetail);

module.exports = router;
