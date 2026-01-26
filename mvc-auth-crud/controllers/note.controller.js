const noteModel = require('../models/note.model');
const userModel  = require('../models/user.model');


module.exports.createNotes = async function(req,res){
    try{
        const {content, title} = req.body;
        let user = await userModel.findOne({email : req.user.email});
        let notes = await noteModel.create({
            title,
            content,
            user : user._id
        });
        return res.status(200).json({
            success : true,
            message : " blog posted",
            data : {
                title : notes.title,
                content : notes.content
            }
        })
    }
    catch(error){
        res.status(500).json({
            success : false,
            message : error.message

        })
    }
};

module.exports.readNotes = async function(req,res){
    try{
        const notes = await noteModel.find({
            user : req.user.id
            })
            .populate('user', "email name -_id")
            .sort({createdAt : -1});

            return res.status(200).json({
                success : true,
                data : {
                    notes : notes
                }
            });

       }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}