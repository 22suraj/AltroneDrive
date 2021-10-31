const folderModel = require("../models/FolderModel");
const albumModel = require("../models/AlbumModel");
const jwt = require("jsonwebtoken");

//---------------------------------------------------------------------------------------

const createFolder = async (req, res) => {
  try {
    const { folderName, token } = req.body;

    if (!token || !folderName) {
      return res
        .status(422)
        .json({ status: false, message: "Fields are not properly filled" });
    }

    const decoded = jwt.verify(token, "Altron");

    const folderExist = await folderModel.findOne({
      folderName: folderName,
      userId: decoded._id,
    });

    if (folderExist) {
      return res
        .status(200)
        .json({ status: false, message: "Folder already exist" });
    }

    const newFolder = new folderModel({
      folderName: folderName,
      userId: decoded._id,
    });

    const saveUser = await newFolder.save();

    res.status(200).json({
      status: true,
      message: "Folder created successfull",
      token: {
        access: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//----------------------------------------------------------------------------------------

const fetchFolder = async (req, res) => {
  try {
    const token = req.get("token");

    if (!token) {
      return res
        .status(422)
        .json({ status: false, message: "Token is not properly filled" });
    }

    const decoded = jwt.verify(token, "Altron");

    const folders = await folderModel.find({
      userId: decoded._id,
    });

    if (folders.length == 0) {
      return res
        .status(200)
        .json({ status: true, message: "Folders doesn't exist" });
    }

    // const newFolder = new folderModel({
    //   folderName: folderName,
    //   userId: decoded._id,
    // });

    // const saveUser = await newFolder.save();

    res.status(200).json({
      status: true,
      message: "Folders retrieved successfull",
      data: folders,
    });
  } catch (error) {
    console.log(error);
  }
};

//-----------------------------------------------------------------------------------------

const deleteFolder = async (req, res) => {
  try {
    const { folderName, token } = req.body;

    if (!token || !folderName) {
      return res
        .status(422)
        .json({ status: false, message: "Fields are not properly filled" });
    }

    const decoded = jwt.verify(token, "Altron");
    const folderExist = await folderModel.findOne({
      folderName: folderName,
      userId: decoded._id,
    });

    if (!folderExist) {
      return res
        .status(200)
        .json({ status: false, message: "Folder doesn't exist" });
    }

    folderModel
      .find({ folderName: folderName, userId: decoded._id })
      .deleteOne()
      .exec();

    res.status(200).json({
      status: true,
      message: "Folder delete successfull",
      token: {
        access: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------

const createAlbum = async (req, res) => {
  try {
    const { albumName, token } = req.body;

    if (!token || !albumName) {
      return res
        .status(422)
        .json({ status: false, message: "Fields are not properly filled" });
    }
    const decoded = jwt.verify(token, "Altron");

    const albumExist = await albumModel.findOne({
      albumName: albumName,
      userId: decoded._id,
    });

    if (albumExist) {
      return res
        .status(200)
        .json({ status: false, message: "Album already exist" });
    }

    const newAlbum = new albumModel({
      albumName: albumName,
      userId: decoded._id,
    });

    const saveUser = await newAlbum.save();

    res.status(200).json({
      status: true,
      message: "Album created successfull",
      token: {
        access: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//----------------------------------------------------------------------------------------

const fetchAlbum = async (req, res) => {
  try {
    const token = req.get("token");

    if (!token) {
      return res
        .status(422)
        .json({ status: false, message: "Token is not properly filled" });
    }

    const decoded = jwt.verify(token, "Altron");

    const albums = await albumModel.find({
      userId: decoded._id,
    });

    if (albums.length == 0) {
      return res
        .status(200)
        .json({ status: true, message: "Album doesn't exist" });
    }

    // const newFolder = new folderModel({
    //   folderName: folderName,
    //   userId: decoded._id,
    // });

    // const saveUser = await newFolder.save();

    res.status(200).json({
      status: true,
      message: "Albums retrieved successfull",
      data: albums,
    });
  } catch (error) {
    console.log(error);
  }
};

//-----------------------------------------------------------------------------------------

const deleteAlbum = async (req, res) => {
  try {
    const { albumName, token } = req.body;

    if (!token || !albumName) {
      return res
        .status(422)
        .json({ status: false, message: "Fields are not properly filled" });
    }

    const decoded = jwt.verify(token, "Altron");
    const albumExist = await albumModel.findOne({
      albumName: albumName,
      userId: decoded._id,
    });

    if (!albumExist) {
      return res
        .status(200)
        .json({ status: false, message: "Album doesn't exist" });
    }

    albumModel
      .find({ albumName: albumName, userId: decoded._id })
      .deleteOne()
      .exec();

    res.status(200).json({
      status: true,
      message: "Album delete successfull",
      token: {
        access: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createFolder,
  fetchFolder,
  deleteFolder,
  createAlbum,
  fetchAlbum,
  deleteAlbum,
};
