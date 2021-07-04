const orderDetailController = require("../controllers/order_detail-controller");
const router = require("express").Router();

router.post("/createOD", orderDetailController.createOrderDetail);
router.get("/getOD", orderDetailController.getOrderDetail);
router.get("/getOD/:id", orderDetailController.getOrderDetailId);
router.put("/updateOD/:id", orderDetailController.updateOrderDetail);
router.delete("/deleteOD/:id", orderDetailController.deleteOrderDetail);

module.exports = router;
