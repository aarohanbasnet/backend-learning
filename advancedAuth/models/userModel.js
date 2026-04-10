const  mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    email : String,
    password : String,
    refreshToken : String
});

module.exports = mongoose.model("User", userModel);