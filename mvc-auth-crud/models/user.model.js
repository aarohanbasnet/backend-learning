const mongoose= require("mongoose");

let userSchema = mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : String,
});

module.exports = mongoose.model('User', userSchema);