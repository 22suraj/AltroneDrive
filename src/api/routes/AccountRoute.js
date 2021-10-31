const express = require("express");
const router = express.Router();
const accountController = require("../controllers/AccountController");

router.post("/register", accountController.register);
router.post("/login", accountController.loginUser);
router.post("/update", accountController.updateUser);
router.post("/update/image", accountController.updateUserImg);
router.post("/info", accountController.userInfo);

module.exports = router;
