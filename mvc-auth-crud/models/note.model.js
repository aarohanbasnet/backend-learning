const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title : String,
    content : String,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    date : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('Note', noteSchema);