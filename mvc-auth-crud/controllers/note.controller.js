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
            })
            .populate('user', "name -_id")
            .sort({createdAt : -1});

            return res.status(201).json({
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
};

module.exports.editNotes = async function(req,res){
    try{

     const noteId = req.params.noteId;
     const {content, title} = req.body;
     const updatedNote =  await noteModel.findOneAndUpdate(
        {
            _id : noteId,
            user : req.user.id
        },
        {title, content},
        {
            new : true,
            runValidators : true
        }
      );

      if(!updatedNote){
        return res.status(404).json({
            success : false,
            message : "Note not found"
        });
      }

      return res.status(200).json({
        success  : true,
        message : "Note updated successfully",
        note : updatedNote
      })
     

    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
};

module.exports.deleteNotes = async function(req, res){
    try{
        const noteId = req.params.noteId;
        const deletedNote = await noteModel.findByIdAndDelete({
        _id : noteId,
        user : req.user.id
    });

    if(!deletedNote){
        return res.status(404).json({
            success : false,
            message : "Note not found or unauthorized"
        });
    };

    return res.status(200).json({
        success : true,
        message : "Note deleted successfully"
    });

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message,
        });
    }
}