const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const adminLoginSchema = new mongoose.Schema(
  {
    username: {
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
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Convert password into hash
adminLoginSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);
    }
    next();
  } catch (error) {}
});

//Generate token
adminLoginSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id }, "Altron");
    return token;
  } catch (error) {
    res.send(error);
  }
};

adminLoginSchema.methods.checkEmailValidation = async function () {
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

module.exports = mongoose.model("adminLogin", adminLoginSchema, "Admin Account");
