const express = require('express');
const router = express.Router();

const {sendEmail} = require('../serivces/emailService');
const {emailLimiter} = require("../middlewares/rateLimitter");

router.post('/send-welcome', emailLimiter, async(req, res)=>{

    const {email, name} =req.body;
    if(!email) {
        return res.status(400).json({error : "Email is required"});
    }

    const info = await sendEmail(
        email,
        "Welcome to the Team!",
        `Hi ${name || "Intern"}, we are glad to have you!`
    );

    res.status(200).json({
        message : "Success! Mail is in flight",
        preview : info.previewUrl // Comes from service's return 
    })
})


module.exports = router;