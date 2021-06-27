const CategoryController = require("../controllers/category-controller");
const auth = require('../middleware/authJwt')
const router = require("express").Router();

router.post("/createCategory", CategoryController.createCategory);
router.get("/getCategory", CategoryController.getCategory);
router.get("/getCategory/:id", CategoryController.getCategoryId);
// router.put("/:id", auth.verifyToken, userController.updateUser);
// router.delete("/:id", auth.verifyToken, userController.deleteUser);
// router.post("/login", userController.loginUser, auth.verifyToken);



module.exports = router;
