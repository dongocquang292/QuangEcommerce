const voucherController = require("../controllers/voucher-controller");
const auth = require('../middleware/authJwt');
const router = require("express").Router();

router.post("/createVoucher", auth.verifyToken, voucherController.createVoucher);
router.get("/getVoucher", auth.verifyToken, voucherController.getVoucher);
router.get("/getVoucher/:id", auth.verifyToken, voucherController.getVoucherId);
router.put("/updateVoucher/:id", auth.verifyToken, voucherController.updateVoucher);
router.delete("/deleteVoucher/:id", auth.verifyToken, voucherController.deleteVoucher);

module.exports = router;
