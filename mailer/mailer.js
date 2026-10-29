const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const TEMPLATE_PATH = path.resolve(process.env.TEMPLATE_PATH);
async function sendEmail({ name, email, phone, description }) {
  try {
    const templatePath = path.join(__dirname, );
    let htmlTemplate = fs.readFileSync(TEMPLATE_PATH, 'utf8');

    // Replace placeholders
    htmlTemplate = htmlTemplate
      .replace(/{{name}}/g, name)
      .replace(/{{email}}/g, email)
      .replace(/{{phone}}/g, phone)
      .replace(/{{description}}/g, description || 'N/A');

      console.log("connection req: ",process.env.MAIL_USER,process.env.MAIL_PASS)
    let transporter = await nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });


    let info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: "Appointment Request Confirmation",
      html: htmlTemplate,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("Error sending mail:", error);
  }
}


module.exports = { sendEmail }
