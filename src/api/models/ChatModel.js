const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const chatSchema = new mongoose.Schema(
  {
    
    
    message: {
      type: String,
    },

    senderUserId: {
        type: String,
    },

    receiverUserId: {
        type: String,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("chat", chatSchema, "Chat");
