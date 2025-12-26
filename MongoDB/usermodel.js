
const mongoose = require('mongoose')

mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`)
.then(()=>{
    console.log("MongoDB connected")
})
.catch((error)=>{
    console.log("MongoDB connection error :", error);
})

const userSchema = mongoose.Schema({
    name : String,
    username : String,
    email : String,
    age : Number
});

module.exports = mongoose.model("user", userSchema);