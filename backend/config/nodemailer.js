import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const transporter = nodeMailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    debug: true,
})

export default transporter