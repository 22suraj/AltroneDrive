const express = require("express");
const router = express.Router();
const storyvideoController = require("../controllers/StoryVideoController");

//CREATE
router.post("/story/upload", storyvideoController.uploadStory);
router.post("/story/delete", storyvideoController.deleteStory);
// router.post("/video/upload", storyvideoController.uploadVideo);
// router.post("/video/delete", storyvideoController.deleteVideo);
// router.post("/album/create", folderController.createAlbum);
// router.post("/album/delete", folderController.deleteAlbum);

//FETCH
// router.get("/folders", folderController.fetchFolder);

module.exports = router;
