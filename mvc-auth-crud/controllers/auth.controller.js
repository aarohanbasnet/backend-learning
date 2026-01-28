const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const {hash, compare} = require('../utils/bcryptUtils');
const {generateToken, verifyToken} = require('../utils/generateToken');

module.exports.register = async function(req,res){
    try{
        const {name, email, password} = req.body;

    //check if user exits
    let user = await userModel.findOne({email});
    if(user) return res.status(400).json({
        success : false,
        "message" : "user alredy exists please login"
    })


    const hashedPassword = await hash(password);
    
    //create user
    user = await userModel.create({
        name,
        email,
        password :hashedPassword
    });

    const token = generateToken(user);
    res.cookie('token', token);

    return res.status(200).json({
        success : true,
        message : "user created successfully",
        data : {
            id : user._id,
            name : user.name,
            email : user.email,
            password : user.password

        }
    });




}
    catch(error){
        res.status(500).json({
            message : error.message,
        })
    };
    
    
};

module.exports.login = async function(req,res){
    const {email, password} = req.body;
    try{

        const user = await userModel.findOne({email});
        if(!user) return res.status(400).json({
            success : false,
            message : "No user exists"
        });


    const isMatch = await compare(password, user.password);
    if(!isMatch) return res.status(401).json({
        success : false,
        message : "invalid credientials"
    });

    const token = generateToken(user);
    res.cookie("token", token);
    
    return res.status(201).json({
        success : true,
        message : "you can login"
    });


    } catch(error){
        return res.status(400).json({
            message : error.message
        });
    }
    
    

}

module.exports.logout = async function(req, res){
    try{
    res.clearCookie("token");
    return res.status(200).json({
        success : true,
        message : 'Logged out successfully'
    });
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }

}