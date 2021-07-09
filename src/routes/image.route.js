
const imageController = require("../controllers/image-controller");
const uploadMiddleware = require('../middleware/upload');
const auth = require('../middleware/authJwt');
const router = require("express").Router();


router.post("/createImage", auth.verifyToken, uploadMiddleware.uploadImg, imageController.createImage);
router.get("/getImage", auth.verifyToken, imageController.getImage);
router.get("/getImage/:id", auth.verifyToken, imageController.getImageId);
router.put("/updateItem/:id", auth.verifyToken, uploadMiddleware.uploadImg, imageController.updateImage);
router.delete("/deleteItem/:id", auth.verifyToken, imageController.deleteImage);

module.exports = router;
