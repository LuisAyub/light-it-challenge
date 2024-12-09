const transporter = require("../config/emailConfig")
const {getPatient} = require("../services/databaseHandler")

const setupEmail = async (patient) => {
    try {    
        const subject = "Welcome to Backend - Patient Registration!"
        const text = `Hello ${patient.name}, welcome to our platform.`
        const html = `<p>Hello <strong>${patient.name}</strong>, welcome to our platform.</p>`;
    
        const info = await sendEmail(patient.email, subject, text, html)
        
        return {info}
      } catch (error){
        console.error(error)
        return {error}
      }
} 

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: '"Backend - Patient Registration" <no-reply@demomailtrap.com>',
            to,
            subject,
            text,
            html,
        });
        console.log("Email sent successfully!")
        return info;
    } catch (error){
        console.error(error)
        throw error;
    }
};

module.exports = setupEmail