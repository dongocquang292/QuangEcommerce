
const itemController = require("../controllers/item-controller");
const uploadMiddleware = require('../middleware/upload');
const validate = require('../middleware/validateUser');
const CheckRole = require('../middleware/checkRole');
const auth = require('../middleware/authJwt');
const router = require("express").Router();

router.post("/createItem", auth.verifyToken, CheckRole.checkRole, uploadMiddleware.uploadThumbnail, itemController.createItem);
router.get("/getItem", auth.verifyToken, CheckRole.checkRole, itemController.getItem);
router.get("/getItem/:id", auth.verifyToken, CheckRole.checkRole, itemController.getItemId);
router.get("/getImg/:id", auth.verifyToken, CheckRole.checkRole, itemController.getImgOfItem);
router.put("/updateItem/:id", auth.verifyToken, CheckRole.checkRole, uploadMiddleware.uploadThumbnail, itemController.updateItem);
router.delete("/deleteItem/:id", auth.verifyToken, CheckRole.checkRole, itemController.deleteItem);

module.exports = router;
