const nodemailer = require('nodemailer')
const dotenv = require("dotenv")
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
    }
});

transporter.verify((error, success) => {
    if (error){
        console.log("error configuring mail transporter:", error)
    } else {
        console.log("Mail transporter is ready!")
    }
});

module.exports = transporter;