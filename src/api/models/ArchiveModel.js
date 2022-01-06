const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const archiveSchema = new mongoose.Schema(
  {
    archiveFolderName: {
      type: String,
    },

    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("archive", archiveSchema, "Archive");
