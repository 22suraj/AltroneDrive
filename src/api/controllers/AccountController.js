const loginModel = require("../models/AccountModel");
const folderModel = require("../models/FolderModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login_details = async (req, res) => {
  const loginData = await loginModel.find();
  res.json(loginData);
};

//--------------Register New User-----------------//
const register = async (req, res) => {
  try {
    //Get User email & Password
    const { email, password, cpassword } = req.body;

    //Check wheater it is empty or not
    if (!email || !password || !cpassword) {
      return res
        .status(200)
        .json({ status: false, message: "Fields are not properly filled" });
    }

    //Find wheather it's exist or not
    const userExist = await loginModel.findOne({ email: email });

    if (userExist) {
      return res
        .status(200)
        .json({ status: false, message: "Email already exist" });
    }

    const newUser = new loginModel({
      firstName: "",
      lastName: "",
      DOB: "",
      profession: "",
      profileImage: "",
      storage: 1000,
      email: email,
      password: password,
    });

    if (!newUser.checkEmailValidation()) {
      return res.status(200).json({ error: "Enter valid email id" });
    }

    const token = await newUser.generateAuthToken();
    newUser.token = token;
    const saveUser = await newUser.save();

    res.status(200).json({
      status: true,
      message: "Authentication Successfull",
      token: {
        access: token,
      },
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

//--------------------Login User-----------------------//
const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email);
    console.log(password);

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

//---------------------------------- Update User -----------------------------------

const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, DOB, token } = req.body;

    if (!firstName || !lastName || !DOB || !token) {
      return res
        .status(200)
        .json({ status: false, message: "Fields are not properly filled" });
    }

    const userExist = await loginModel.findOne({ token: token });

    if (userExist) {
      userExist.firstName = firstName;
      userExist.lastName = lastName;
      userExist.DOB = DOB;
      userExist.save();
      return res.status(200).json({
        status: true,
        message: "Successfully Updated",
      });
    } else {
      return res
        .status(200)
        .json({ status: false, message: "Authentication Failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

//---------------------------Get User Info-------------------------------
const userInfo = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res
        .status(200)
        .json({ status: false, message: "Token are not properly filled" });
    }
    const userExist = await loginModel.findOne({ token: token });

    if (userExist) {
      return res.status(200).json({ status: true, data: userExist });
    } else {
      return res
        .status(200)
        .json({ status: false, message: "Authentication Failed" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

//--------------------------------------Update Image---------------------------------//

const updateUserImg = async (req, res) => {
  try {
    let sampleFile;
    let uploadPath;
    const token = req.body.token;

    if (!token) {
      return res
        .status(422)
        .json({ status: false, message: "Fields are not properly filled" });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "No files were uploaded." });
    }

    const userExist = await loginModel.findOne({ token: token });

    if (userExist) {
      console.log("req.files >>>", req.files); // eslint-disable-line

      sampleFile = req.files.sampleFile;

      uploadPath = __dirname + "/public/" + sampleFile.name;

      sampleFile.mv("public/" + sampleFile.name, function (err) {
        if (err) {
          console.log(err);
          return res
            .status(200)
            .json({ status: false, message: "Image Failed to Upload" });
        }

        userExist.profileImage = "http://192.168.1.5:8000/" + sampleFile.name;
        console.log("http://192.168.1.5:8000/" + sampleFile.name);
        userExist.save();
        return res.status(200).json({
          status: true,
          message: "Profile Image Successfully Updated",
        });
      });
    } else {
      return res
        .status(422)
        .json({ status: false, message: "Authentication Failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

//------------------------------------------------------------------------------------------
const login_get_user_by_id = async (req, res) => {
  const specificUser = await login.findById({ _id: req.params.id });
  res.json(specificUser);
};

module.exports = {
  login_details,
  register,
  login_get_user_by_id,
  loginUser,
  updateUser,
  updateUserImg,
  userInfo,
};
