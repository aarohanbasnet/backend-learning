const mongoose = require("mongoose");

const  connectDB =  async() =>{
    await mongoose.connect("mongodb://127.0.0.1:27017/advancedAuth");
    console.log("DB Connected");
}

module.exports = connectDB;