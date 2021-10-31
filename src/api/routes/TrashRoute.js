const express = require("express");
const router = express.Router();
const trashController = require("../controllers/TrashController");


//CREATE
router.post("/trash/create", trashController.createTrash);
router.post("/trash/delete", trashController.deleteTrash);
// router.post("/album/create", folderController.createAlbum);
// router.post("/album/delete", folderController.deleteAlbum);

//FETCH
// router.get("/folders", folderController.fetchFolder);

module.exports = router;
