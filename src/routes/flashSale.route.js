const flashSaleController = require("../controllers/flashSale-controller");
const auth = require('../middleware/authJwt');
const router = require("express").Router();

router.post("/createFlashSale", auth.verifyToken, flashSaleController.createFlashSale);
router.get("/getFlashSale", auth.verifyToken, flashSaleController.getFlashSale);
router.get("/getFlashSale/:id", auth.verifyToken, flashSaleController.getFlashSaleId);
router.put("/updateFlashSale/:id", auth.verifyToken, flashSaleController.updateFlashSale);
router.delete("/deleteFlashSale/:id", auth.verifyToken, flashSaleController.deleteFlashSale);
router.post("/notification", auth.verifyToken, flashSaleController.notification);
module.exports = router;
