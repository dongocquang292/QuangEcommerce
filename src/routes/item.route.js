
const itemController = require("../controllers/item-controller");
const uploadMiddleware = require('../middleware/upload')
const router = require("express").Router();


router.post("/createItem", uploadMiddleware.uploadImg, itemController.createItem);
router.get("/getItem", itemController.getItem);
router.get("/getItem/:id", itemController.getItemId);
router.put("/updateItem/:id", uploadMiddleware.uploadImg, itemController.updateItem);
router.delete("/deleteItem/:id", itemController.deleteItem);

module.exports = router;
