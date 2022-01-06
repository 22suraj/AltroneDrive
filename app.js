const express = require("express");
const fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
const app = express();
const connectDB = require("./src/config/db");
const accountRouter = require("./src/api/routes/AccountRoute");
const folderRouter = require("./src/api/routes/FolderAlbumRoute");
const trashRouter = require("./src/api/routes/TrashRoute");
const archiveRouter = require("./src/api/routes/ArchiveRoute");
const storyvideoRouter = require("./src/api/routes/StoryVideoRoute");
const videoPhotoRouter = require("./src/api/routes/VideoPhotoRoute");
const forgetPasswordRouter = require("./src/api/routes/ForgetPasswordRoute");

//Connect DB
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(upload.array());
app.use(express.static("public"));
app.use(fileUpload());

app.use("/api/account", accountRouter);
app.use("/api/account", forgetPasswordRouter);
app.use("/api/data", folderRouter);
app.use("/api/data", trashRouter);
app.use("/api/data", archiveRouter);
app.use("/api/data", storyvideoRouter);
app.use("/api/data", videoPhotoRouter);

// const loginRouter = require("./routes/account");
// const connectDB = require("./src/config/db");
// app.use("/login", loginRouter);

app.listen(8000, () => console.log("Server Started"));
