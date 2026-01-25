const jwt = require('jsonwebtoken');

module.exports.generateToken = function(user){
   return jwt.sign({email : user.email, id : user._id}, process.env.JWT_SECRET),{
    expiresIn : '1h'
   };
};

module.exports.verifyToken = function(token){
    return jwt.verify(token, process.env.JWT_SECRET);
}