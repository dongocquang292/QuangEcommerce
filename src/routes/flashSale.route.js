const flashSaleController = require("../controllers/flashSale-controller");
const router = require("express").Router();

router.post("/createFlashSale", flashSaleController.createFlashSale);
router.get("/getFlashSale", flashSaleController.getFlashSale);
router.get("/getFlashSale/:id", flashSaleController.getFlashSaleId);
router.put("/updateFlashSale/:id", flashSaleController.updateFlashSale);
router.delete("/deleteFlashSale/:id", flashSaleController.deleteFlashSale);
router.post("/priceDiscount/:id", flashSaleController.priceDiscount);
module.exports = router;
