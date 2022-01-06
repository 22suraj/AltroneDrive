const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    DOB: {
      type: String,
    },
    storage: {
      type: Number,
    },
    profession: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    notification: {
      type: String,
    },
    referalCode: {
      type: String,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Convert password into hash
loginSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);
    }
    next();
  } catch (error) {}
});

//Generate token
loginSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id }, "Altron");
    return token;
  } catch (error) {
    res.send(error);
  }
};

loginSchema.methods.checkEmailValidation = async function () {
  // const re = RegExp("[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

  //   if(re.test(this.email)){
  //     return true;
  //   } else{
  //     return false;

  // }
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      this.email
    )
  ) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
};

module.exports = mongoose.model("login", loginSchema, "Account");
