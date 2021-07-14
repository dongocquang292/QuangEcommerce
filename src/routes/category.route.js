const CategoryController = require("../controllers/category-controller");
const CheckRole = require('../middleware/checkRole');
const auth = require('../middleware/authJwt');
const router = require("express").Router();
const validateCategory = require('../middleware/validateCategory')

router.post("/createCategory", auth.verifyToken, CheckRole.checkRole, validateCategory.validateCreateCategory, CategoryController.createCategory);
router.get("/getCategory", auth.verifyToken, CheckRole.checkRole, CategoryController.getCategory);
router.get("/getCategory/:id", auth.verifyToken, CheckRole.checkRole, CategoryController.getCategoryId);
router.put("/updateCategory/:id", auth.verifyToken, CheckRole.checkRole, CategoryController.updateCategory);
router.delete("/deleteCategory/:id", auth.verifyToken, CheckRole.checkRole, CategoryController.deleteCategory);
router.get("/sortBanner", auth.verifyToken, CheckRole.checkRole, CategoryController.sortBanner);
router.get('/getCategoryActive', auth.verifyToken, CheckRole.checkRole, CategoryController.getCategoryActive);

module.exports = router;
