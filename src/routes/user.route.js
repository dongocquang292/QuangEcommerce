const userController = require("../controllers/user-controller");
const auth = require('../middleware/authJwt');
const router = require("express").Router();
const validateUser = require('../middleware/validate');

router.post('/search', auth.verifyToken, userController.findUserName);
router.post('/verifyTokenEmail/:token', userController.verifyTokenEmail)
router.post("/register", validateUser.validateUser, userController.registerUser);
router.get("/sortUser", auth.verifyToken, userController.sortUser);
router.get("/getAllUser", auth.verifyToken, userController.getUser);
router.get("/:id", auth.verifyToken, userController.getUserId);
router.put("/:id", validateUser.validateUser, auth.verifyToken, userController.updateUser);
router.delete("/:id", auth.verifyToken, userController.deleteUser);
router.post("/login", validateUser.validateUserLogin, userController.loginUser);

module.exports = router;
