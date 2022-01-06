const express = require("express");
const router = express.Router();
const archiveController = require("../controllers/ArchiveController");


//CREATE
router.post("/archive/create", archiveController.createArchive);
router.post("/archive/remove", archiveController.removeArchive);
// router.post("/album/create", folderController.createAlbum);
// router.post("/album/delete", folderController.deleteAlbum);

//FETCH
router.get("/archives", archiveController.fetchArchive);

module.exports = router;
