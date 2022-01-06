const folderModel = require("../models/FolderModel");
const trashModel = require("../models/TrashModel");
const jwt = require("jsonwebtoken");

//---------------------------------------------------------------------------------------

const createTrash = async (req, res) => {
  try {
    const { name, token } = req.body;

    if (!token || !name) {
      return res
        .status(422)
        .json({ status: false, message: "Fields are not properly filled" });
    }

    const decoded = jwt.verify(token, "Altron");

    const trashExist = await trashModel.findOne({
      name: name,
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

    if (trashExist) {
      return res
        .status(200)
        .json({ status: false, message: "Trash already exist" });
    }

    folderModel
      .find({ folderName: name, userId: decoded._id })
      .deleteOne()
      .exec();

    const newTrash = new trashModel({
      name: name,
      userId: decoded._id,
    });

    const saveUser = await newTrash.save();

    res.status(200).json({
      status: true,
      message: "Folder added to trash",
      token: {
        access: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//----------------------------------------------------------------------------------------

// const fetchFolder = async (req, res) => {
//   try {
//     const token = req.get("token");

//     if (!token) {
//       return res
//         .status(422)
//         .json({ status: false, message: "Token is not properly filled" });
//     }

//     const decoded = jwt.verify(token, "Altron");

//     const folders = await folderModel.find({
//       userId: decoded._id,
//     });

//     if (folders.length == 0) {
//       return res
//         .status(200)
//         .json({ status: true, message: "Folders doesn't exist" });
//     }

//     // const newFolder = new folderModel({
//     //   folderName: folderName,
//     //   userId: decoded._id,
//     // });

//     // const saveUser = await newFolder.save();

//     res.status(200).json({
//       status: true,
//       message: "Folders retrieved successfull",
//       data: folders,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

//-----------------------------------------------------------------------------------------

const deleteTrash = async (req, res) => {
  try {
    const { name, token } = req.body;

    if (!token || !name) {
      return res
        .status(422)
        .json({ status: false, message: "Fields are not properly filled" });
    }

    const decoded = jwt.verify(token, "Altron");
    const trashExist = await trashModel.findOne({
      name: name,
      userId: decoded._id,
    });

    if (!trashExist) {
      return res
        .status(200)
        .json({ status: false, message: "Trash doesn't exist" });
    }

    trashModel.find({ name: name, userId: decoded._id }).deleteOne().exec();

    res.status(200).json({
      status: true,
      message: "Trash deleted successfull",
      token: {
        access: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTrash,
  //   fetchFolder,
  deleteTrash,
};
