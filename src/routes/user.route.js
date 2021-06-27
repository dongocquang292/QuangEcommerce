const userController = require("../controllers/user-controller");
const auth = require('../middleware/authJwt')
const router = require("express").Router();

router.post("/register", userController.registerUser);
router.get("/", auth.verifyToken, userController.getUser);
router.get("/:id", auth.verifyToken, userController.getUserId);
router.put("/:id", auth.verifyToken, userController.updateUser);
router.delete("/:id", auth.verifyToken, userController.deleteUser);
router.post("/login", userController.loginUser, auth.verifyToken);



module.exports = router;
