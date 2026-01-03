
const mongoose = require('mongoose');

//mongoose.connect("mongodb://localhost:27017/name")
mongoose.connect('mongodb://127.0.0.1:27017/authtetsapp');

//creating schema
const userSchema = mongoose.Schema({
    username : String,
    email : String,
    password : String,
    age : Number
});


module.exports = mongoose.model("user", userSchema);