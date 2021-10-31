const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const albumSchema = new mongoose.Schema(
  {
    albumName: {
      type: String,
    }, 
    
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("album", albumSchema, "Album");
