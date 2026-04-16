const { hashPassword } = require('../utils/hash');
const User = require('../models/user.model');

const registerService = async ({email, password}) => {
    const existingUser = await User.findOne({email});
    if(existingUser) throw new Error("User alreday exists");

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
        email : email,
        password : hashedPassword
    });

    return { msg : "User registered successfully"};
}