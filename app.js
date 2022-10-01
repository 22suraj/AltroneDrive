const express = require("express");
const fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
const app = express();
const connectDB = require("./src/config/db");
const accountRouter = require("./src/api/routes/AccountRoute");
const acccountAdminRouter = require("./src/api/routes/AdminAccountRoute");
const folderRouter = require("./src/api/routes/FolderAlbumRoute");
const trashRouter = require("./src/api/routes/TrashRoute");
const archiveRouter = require("./src/api/routes/ArchiveRoute");
const storyvideoRouter = require("./src/api/routes/StoryVideoRoute");
const videoPhotoRouter = require("./src/api/routes/VideoPhotoRoute");
const forgetPasswordRouter = require("./src/api/routes/ForgetPasswordRoute");
const chatRouter = require("./src/api/routes/ChatRouter");


//Connect DB
connectDB();

app.set("view engine", "ejs");

app.use("/public", express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(upload.array());
app.use(express.static("public"));
app.use(fileUpload());

app.get("/", function (req, res) {
  res.render("pages/index", { name: "Chris Martin" });
});
app.post("/dashboard", function (req, res) {
  console.log(req.body);
  res.render("pages/dashboard", { data: req.body });
});

app.use("/api/account", accountRouter);
app.use("/api/adminaccount", acccountAdminRouter);
app.use("/api/account", forgetPasswordRouter);
app.use("/api/data", folderRouter);
app.use("/api/data", trashRouter);
app.use("/api/data", archiveRouter);
app.use("/api/data", storyvideoRouter);
app.use("/api/data", videoPhotoRouter);


// const loginRouter = require("./routes/account");
// const connectDB = require("./src/config/db");
// app.use("/login", loginRouter);
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});



io.on("connection", (socket) => {
  // console.log("What is socket", socket); 
  socket.on("chat", (payload) => {
    console.log("What is payload", payload);
    io.emit("chat", payload);
  });
});

//server.use("/api/data", chatRouter);

server.listen(5000, () => {
  console.log("Chat server started listening 5000");
});

app.listen(8000, () => console.log("Server Started"));