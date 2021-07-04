const orderController = require("../controllers/order-cotroller");
const router = require("express").Router();

router.post("/createOrder", orderController.createOrder);
router.get("/getOrder", orderController.getOrder);
router.get("/getOrder/:id", orderController.getOrderId);
router.put("/updateOrder/:id", orderController.updateOrder);
router.delete("/deleteOrder/:id", orderController.deleteOrder);

module.exports = router;
