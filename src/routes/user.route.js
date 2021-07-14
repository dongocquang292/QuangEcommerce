const userController = require("../controllers/user-controller");
const auth = require('../middleware/authJwt');
const router = require("express").Router();
const validateUser = require('../middleware/validateUser');


router.post('/verifyTokenEmail/:token', userController.verifyTokenEmail)
router.post("/register", validateUser.validateUserRegister, userController.registerUser);
router.get("/getAllUser", auth.verifyToken, userController.getUser);
router.get("/:id", auth.verifyToken, userController.getUserId);
router.put("/:id", auth.verifyToken, userController.updateUser);
router.delete("/:id", auth.verifyToken, userController.deleteUser);
router.post("/login", validateUser.validateUserLogin, userController.loginUser);

module.exports = router;
