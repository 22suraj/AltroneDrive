const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const folderSchema = new mongoose.Schema(
  {
    folderName: {
      type: String,
    },

    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("folder", folderSchema, "Folder");
