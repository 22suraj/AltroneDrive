const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect("mongodb://192.168.56.102/Altron", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.once("open", () => {
      console.log("Mongodb connected");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
