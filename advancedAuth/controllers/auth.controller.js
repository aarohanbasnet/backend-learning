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

const refresh = async(req, res)=>{
    try{
        const {refreshToken} = req.body;
        const result = await refreshService(refreshToken);
        res.json(result);
        
    } catch(err) {
        res.status(403).json({
            message : err.message
        });
    }
}

module.exports = {register, login, refresh};

