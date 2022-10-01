const loginModel = require("../models/AdminAccountModel");
const folderModel = require("../models/FolderModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const adminRegister = async (req, res) => {
  try {
    //Get User email & Password
    const { username, email, password } = req.body;

    //Check wheater it is empty or not
    if (!email || !password || !username) {
      return res
        .status(200)
        .json({ status: false, message: "Fields are not properly filled" });
    }

    //Find wheather it's exist or not
    const userExist = await loginModel.findOne({ email: email });

    if (userExist) {
      return res.redirect("pages/index", {
        errorMessage: "Email already exist", 
      });
      //res.render('pages/index', { err_msg: "Email already exist" });
      //   return res
      //     .status(200)
      //     .json({ status: false, message: "Email already exist" });
    }

    const newUser = new loginModel({
      username: username,
      email: email,
      password: password,
    });

    if (!newUser.checkEmailValidation()) {
      return res.status(200).json({ error: "Enter valid email id" });
    }

    const token = await newUser.generateAuthToken();
    newUser.token = token;
    const saveUser = await newUser.save();

    res.render("pages/dashboard", { data: req.body });

    //   res.status(200).json({
    //     status: true,
    //     message: "Authentication Successfull",
    //     token: {
    //       access: token,
    //     },
    //   });
  } catch (error) {
    res.status(400).send(error);
  }
};

//-----------------------------------------login------------------------------------

const loginAdminUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res
          .status(200)
          .json({ status: true, message: "Fields are not properly filled" });
      }
  
      const userExist = await loginModel.findOne({ email: email });
  
      if (userExist) {
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (isMatch) {
          const token = await userExist.generateAuthToken();
          userExist.token = token;
          userExist.save();
          return res.status(200).json({
            status: true,
            message: "Successfully Login",
            token: { access: token },
          });
        } else {
          return res
            .status(200)
            .json({ status: false, message: "Password doesn't match" });
        }
      } else {
        return res.status(200).json({ status: false, message: "User not found" });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  };

module.exports = {
  adminRegister,
  loginAdminUser
};
