const {verifyToken, generateToken} = require('../utils/generateToken');

module.exports.isLoggedIn = function(req, res, next){
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                success : false,
                message : "please login or register"
            });
        }

        const decoded = verifyToken(token);
        req.user = decoded;
        console.log("Token received: ", req.cookies.token);
        next();

} catch(error){
    return res.status(500).json({
        success : false,
        message : error.message
    });
}     
}