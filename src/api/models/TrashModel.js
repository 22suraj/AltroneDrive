const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const trashSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("trash", trashSchema, "Trash");
