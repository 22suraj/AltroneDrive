const storyModel = require("../models/StoryModel");
const videoModel = require("../models/VideoModel");
const jwt = require("jsonwebtoken");

//---------------------------------------------------------------------------------------

const uploadStory = async (req, res) => {
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

      uploadPath = __dirname + "/public/story/" + sampleFile.name;

      sampleFile.mv("public/story/" + sampleFile.name, function (err) {
        if (err) {
          console.log(err);
          return res
            .status(200)
            .json({ status: false, message: "Story Failed to Upload" });
        }

        const newStory = new storyModel({
          storyName: sampleFile.name,
          storyUrl: "http://192.168.1.5:8000/story/" + sampleFile.name,
          userId: decoded._id,
        });

        const saveUser = newStory.save();

        console.log("http://192.168.1.5:8000/story/" + sampleFile.name);
        return res.status(200).json({
          status: true,
          message: "Story Upload Successfully",
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

const deleteStory = async (req, res) => {
  try {
    const { storyName, token } = req.body;

    if (!token || !storyName) {
      return res
        .status(422)
        .json({ status: false, message: "Fields are not properly filled" });
    }

    const decoded = jwt.verify(token, "Altron");
    const storyExist = await storyModel.findOne({
      storyName: storyName,
      userId: decoded._id,
    });

    if (!storyExist) {
      return res
        .status(200)
        .json({ status: false, message: "Story doesn't exist" });
    }

    storyModel
      .find({ storyName: storyName, userId: decoded._id })
      .deleteOne()
      .exec();

    res.status(200).json({
      status: true,
      message: "Story deleted successfull",
      token: {
        access: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadStory,
  deleteStory,
};
