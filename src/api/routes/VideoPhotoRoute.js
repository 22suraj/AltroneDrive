const express = require("express");
const router = express.Router();
const videoPhotoController = require("../controllers/VideoPhotoController");

//CREATE
router.post("/video/upload", videoPhotoController.uploadVideo);
router.post("/video/delete", videoPhotoController.deleteVideo);
router.post("/video/filter", videoPhotoController.filtervideo);


module.exports = router;
