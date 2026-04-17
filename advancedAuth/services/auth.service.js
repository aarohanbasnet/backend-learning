const { hashPassword } = require('../utils/hash');
const User = require('../models/user.model');
const {generateAccessToken, generateRefreshToken} = require('../utils/generateToken');


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

const loginService = async ({email, password}) => {
    const user = await User.findOne({email});
    if(!user) throw new Error("Invalid credentials");

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await Token.create({
        userId : user._id,
        token : refreshToken,
        expiresAt : new Date(Date.now()+7*24*60*60*1000)
    });

    return { accessToken, refreshToken };
};

const refreshService = async (refreshToken) =>{
    const stored = await Token.findOne({ token : refreshToken });
    if(!stored) throw new Error("Invalid refresh token");
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const newAccessToken = generateAccessToken({_id : stored.userId});
    return { accessToken : newAccessToken };
}

module.exports = {loginService, registerService, refreshService};