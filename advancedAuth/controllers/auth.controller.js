const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const {loginService, registerService, refreshService} = require("../services/auth.service")

const register = async(req, res)=>{
    try{
        const result = await registerService(req.body);
    res.json(result);
    } catch (err) {
        res.status(400).json({
            message : err.message
        });
    }
    
};

const login = async(req, res)=>{
    try{
    const result = await loginService(req.body);
    res.json(result);
    } catch (err) {
        res.status(400).json({
            message : err.message
        });
    }
};

