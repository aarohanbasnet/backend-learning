const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const login = async(req, res)=>{
try{
    const {email, pasaword} = req.body;
    const user = await userModel.findOne({email});
    if(!user) return res.status(400).json({msg : "User not found"});
} catch (error){

}
    

}