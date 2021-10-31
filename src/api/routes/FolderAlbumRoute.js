const express = require("express");
const router = express.Router();
const folderController = require("../controllers/FolderAlbumController");


//CREATE
router.post("/folder/create", folderController.createFolder);
router.post("/folder/delete", folderController.deleteFolder);
router.post("/album/create", folderController.createAlbum);
router.post("/album/delete", folderController.deleteAlbum);

//FETCH
router.get("/folders", folderController.fetchFolder);
router.get("/albums", folderController.fetchAlbum);

module.exports = router;
