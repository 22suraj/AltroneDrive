const folderModel = require("../models/FolderModel");
const archiveModel = require("../models/ArchiveModel");
const jwt = require("jsonwebtoken");

//---------------------------------------------------------------------------------------

const createArchive = async (req, res) => {
  try {
    const { name, token } = req.body;

    if (!token || !name) {
      return res
        .status(422)
        .json({ status: false, message: "Fields are not properly filled" });
    }

    const decoded = jwt.verify(token, "Altron");

    const archiveExist = await archiveModel.findOne({
      archiveFolderName: name,
      userId: decoded._id,
    });

    const folderExist = await folderModel.findOne({
      folderName: name,
      userId: decoded._id,
    });

    if (!folderExist) {
      return res
        .status(200)
        .json({ status: false, message: "Folder doesn't exist" });
    }

    if (archiveExist) {
      return res
        .status(200)
        .json({ status: false, message: "Archive already exist" });
    }

    folderModel
      .find({ folderName: name, userId: decoded._id })
      .deleteOne()
      .exec();

    const newArchive = new archiveModel({
      archiveFolderName: name,
      userId: decoded._id,
    });

    const saveUser = await newArchive.save();

    res.status(200).json({
      status: true,
      message: "Folder added to archive",
      token: {
        access: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//----------------------------------------------------------------------------------------

const fetchArchive = async (req, res) => {
  try {
    const token = req.get("token");

    if (!token) {
      return res
        .status(422)
        .json({ status: false, message: "Token is not properly filled" });
    }

    const decoded = jwt.verify(token, "Altron");

    const archives = await archiveModel.find({
      userId: decoded._id,
    });

    if (archives.length == 0) {
      return res
        .status(200)
        .json({ status: true, message: "Archive doesn't exist" });
    }

    // const newFolder = new folderModel({
    //   folderName: folderName,
    //   userId: decoded._id,
    // });

    // const saveUser = await newFolder.save();

    res.status(200).json({
      status: true,
      message: "Archives retrieved successfull",
      data: archives,
    });
  } catch (error) {
    console.log(error);
  }
};

//-----------------------------------------------------------------------------------------

const removeArchive = async (req, res) => {
  try {
    const { name, token } = req.body;

    if (!token || !name) {
      return res
        .status(422)
        .json({ status: false, message: "Fields are not properly filled" });
    }

    const decoded = jwt.verify(token, "Altron");
    const archiveExist = await archiveModel.findOne({
      archiveFolderName: name,
      userId: decoded._id,
    });

    if (!archiveExist) {
      return res
        .status(200)
        .json({ status: false, message: "Archive doesn't exist" });
    }

    archiveModel
      .find({ archiveFolderName: name, userId: decoded._id })
      .deleteOne()
      .exec();

    const newFolder = new folderModel({
      folderName: name,
      userId: decoded._id,
    });

    const saveUser = await newFolder.save();

    res.status(200).json({
      status: true,
      message: "Archive removed successfull",
      token: {
        access: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createArchive,
  fetchArchive,
  removeArchive,
};
