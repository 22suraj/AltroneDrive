const storyModel = require("../models/StoryModel");
const videoModel = require("../models/VideoModel");
const jwt = require("jsonwebtoken");

//---------------------------------------------------------------------------------------

const uploadVideo = async (req, res) => {
  try {
    let sampleFile;
    let uploadPath;
    const token = req.body.token;

    if (!token) {
      return res
        .status(422)
        .json({ status: false, message: "Fields are not properly filled" });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "No files were uploaded." });
    }

    const decoded = jwt.verify(token, "Altron");

    if (decoded) {
      console.log("req.files >>>", req.files); // eslint-disable-line

      sampleFile = req.files.sampleFile;

      uploadPath = __dirname + "/public/video/" + sampleFile.name;

      sampleFile.mv("public/video/" + sampleFile.name, function (err) {
        if (err) {
          console.log(err);
          return res
            .status(200)
            .json({ status: false, message: "Video Failed to Upload" });
        }

        const newVideo = new videoModel({
          videoName: sampleFile.name,
          videoUrl: "http://192.168.1.5:8000/video/" + sampleFile.name,
          userId: decoded._id,
        });

        const saveUser = newVideo.save();

        console.log("http://192.168.1.5:8000/video/" + sampleFile.name);
        return res.status(200).json({
          status: true,
          message: "Video Upload Successfully",
        });
      });
    } else {
      return res
        .status(422)
        .json({ status: false, message: "Authentication Failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

//----------------------------------------------------------------------------------------

const deleteVideo = async (req, res) => {
  try {
    const { videoName, token } = req.body;

    if (!token || !videoName) {
      return res
        .status(422)
        .json({ status: false, message: "Fields are not properly filled" });
    }

    const decoded = jwt.verify(token, "Altron");
    const videoExist = await videoModel.findOne({
      videoName: videoName,
      userId: decoded._id,
    });

    if (!videoExist) {
      return res
        .status(200)
        .json({ status: false, message: "Video doesn't exist" });
    }

    videoModel
      .find({ videoName: videoName, userId: decoded._id })
      .deleteOne()
      .exec();

    res.status(200).json({
      status: true,
      message: "Video deleted successfull",
      token: {
        access: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------Filter Video----------------------------------

const filtervideo = async (req, res) => {
    try {
      const { videoName, token } = req.body;
  
      if (!token) {
        return res
          .status(422)
          .json({ status: false, message: "Token is not properly filled" });
      }
  
      const decoded = jwt.verify(token, "Altron");
  
      var query = { videoName: RegExp("^" + videoName), userId: decoded._id };
  
      const videos = await videoModel.find(query);
  
      if (videos.length == 0) {
        return res
          .status(200)
          .json({ status: true, message: "Video doesn't exist" });
      }
  
      // const newFolder = new folderModel({
      //   folderName: folderName,
      //   userId: decoded._id,
      // });
  
      // const saveUser = await newFolder.save();
  
      res.status(200).json({
        status: true,
        message: "Video retrieved successfull",
        data: videos,
      });
    } catch (error) {
      console.log(error);
    }
  };

module.exports = {
  uploadVideo,
  deleteVideo,
  filtervideo
};
