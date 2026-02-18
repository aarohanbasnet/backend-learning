const rateLimit = require('express-rate-limit');

const emailLimiter = rateLimit({
    windowMs : 10*60*1000, //10 min in miliseconds
    max : 3,
    message : {
        status : 429,
        message : "Too many emails sent from this IP, please try again in 15 minutes"
    },
    standardHeaders : true,  //Returns rate limit info in header
    legacyHeaders : false,  // Disable the x-rate limit headers
});

module.exports = {emailLimiter};