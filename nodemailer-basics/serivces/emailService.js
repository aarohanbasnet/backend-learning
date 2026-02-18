const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "jody23@ethereal.email",
    pass: "QspptC16CMXWvy6jnS",
  },
});

const sendEmail = async function(targetEmail, subject, message){
    try{
        const info = await transporter.sendMail({
            from : '"Jody DuBuque" <intern@company.com>',
            to : targetEmail,
            subject : subject,
            text : message,
            html : `<b>${message}</b>`
        });

        console.log("Message sent : %s", info.messageId);
        console.log("Preview URL : %s", nodemailer.getTestMessageUrl(info));

        return info;

    } catch(error){
        console.error("Email failed to send :",error);
        throw error
    }
}

module.exports = {sendEmail};