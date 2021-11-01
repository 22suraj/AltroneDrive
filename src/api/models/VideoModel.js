const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const videoSchema = new mongoose.Schema(
  {
    videoName: {
      type: String,
    },

    videoUrl: {
        type: String,
      },

    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("video", videoSchema, "Video");
