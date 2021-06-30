
const itemController = require("../controllers/item-controller");
const uploadMiddleware = require('../middleware/upload');
const validateItem = require('../middleware/validate')
const router = require("express").Router();


router.post("/createItem", validateItem.validateItem, uploadMiddleware.uploadImg, itemController.createItem);
router.get("/getItem", itemController.getItem);
router.get("/getItem/:id", itemController.getItemId);
router.put("/updateItem/:id", validateItem.validateItem, uploadMiddleware.uploadImg, itemController.updateItem);
router.delete("/deleteItem/:id", itemController.deleteItem);

module.exports = router;
