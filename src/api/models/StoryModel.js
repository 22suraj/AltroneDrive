const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const storySchema = new mongoose.Schema(
  {
    storyName: {
      type: String,
    },

    storyUrl: {
        type: String,
      },

    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("story", storySchema, "Story");
