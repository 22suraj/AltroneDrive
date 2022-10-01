const express = require("express");
const router = express.Router();
const accountController = require("../controllers/AdminAccountController");

router.post("/register", accountController.adminRegister);

module.exports = router;