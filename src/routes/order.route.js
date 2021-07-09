const orderController = require("../controllers/order-cotroller");
const auth = require('../middleware/authJwt');
const router = require("express").Router();

router.post("/createOrder", auth.verifyToken, orderController.createOrder);
router.get("/getOrder", auth.verifyToken, orderController.getOrder);
router.get("/getOrder/:id", auth.verifyToken, orderController.getOrderId);
// router.put("/updateOrder/:id", orderController.updateOrder);
router.delete("/deleteOrder/:id", auth.verifyToken, orderController.deleteOrder);

module.exports = router;
