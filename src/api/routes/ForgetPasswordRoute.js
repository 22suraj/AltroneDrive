const express = require("express");
const router = express.Router();
const forgetPasswordController = require("../controllers/ForgetPasswordController");

//CREATE
router.post("/forgetpassword", forgetPasswordController.sendEmail);

module.exports = router;
