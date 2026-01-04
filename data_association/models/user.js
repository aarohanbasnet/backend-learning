
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:2701//testingdb");

const userSchema = mongoose.Schema({
    username : String,
    email : String,
    Age : Number,
    posts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'post'
        }
    ]
})

module.exports = mongoose.model("user", userSchema);    