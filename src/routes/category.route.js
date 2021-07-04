const CategoryController = require("../controllers/category-controller");
const router = require("express").Router();

router.post("/createCategory", CategoryController.createCategory);
router.get("/getCategory", CategoryController.getCategory);
router.get("/getCategory/:id", CategoryController.getCategoryId);
router.put("/updateCategory/:id", CategoryController.updateCategory);
router.delete("/deleteCategory/:id", CategoryController.deleteCategory);
router.get("/sortBanner", CategoryController.sortBanner);
module.exports = router;
