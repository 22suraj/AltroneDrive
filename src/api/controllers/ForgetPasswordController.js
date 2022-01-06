const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const sendEmail = async (req, res) => {
  try {
    const { email, token } = req.body;

    if (!email || !token) {
      return res
        .status(200)
        .json({ status: false, message: "Fields are not properly filled" });
    }

    const decoded = jwt.verify(token, "Altron");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "altronedrive@gmail.com",
        pass: "altronedrive@123", // naturally, replace both with your real credentials or an application-specific password
      },
    });

    const mailOptions = {
      from: "altronedrive@gmail.com",
      to: `${email}`,
      subject: "Reset Password",
      text: `Hello buddy,\n\nPlease click below to reset your password for Altrone Drive.\n\nhttps://192.168.1.1:8000/forgetpassword/${token}.\n\nThe above link is valid only for 2 Hours.\nIf not ask to reset your password, please ignore this message.\n\nThank You,\nAltrone Drive`,
    };

    const status = await transporter.sendMail(mailOptions);

    console.log(status);

    return res.status(200).json({
      status: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = { sendEmail };
