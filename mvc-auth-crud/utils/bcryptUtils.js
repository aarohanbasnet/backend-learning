const bcrypt = require('bcrypt');

module.exports.hash = async function(input){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(input, salt);

};

module.exports.compare = async function(plain, hash){
    return bcrypt.compare(plain, hash);
}