const {verifyToken, generateToken} = require('../utils/generateToken');

module.exports.isLoggedIn = function(req, res, next){
    try{
        const token = req.cookies.token;
        if(!token){
            res.status(401).json({
                success : false,
                message : "please login or register"
            });
        }

        const decoded = verifyToken(token);
        req.user = decoded;
        next();

} catch(error){
    return res.status(500).json({
        success : false,
        message : error.message
    });
}     
}