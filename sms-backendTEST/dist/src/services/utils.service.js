"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class Utils {
    hashPassword = async (password) => {
        const salt = await bcrypt_1.default.genSalt(10);
        const hash = await bcrypt_1.default.hash(password, salt);
        return { salt, hash };
    };
    comparePassword = async (password, salt, hash) => {
        const newHash = await bcrypt_1.default.hash(password, salt);
        return newHash === hash;
    };
    generateSixDigitCode = () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        return code;
    };
    sendEmail = async (to, subject, forgotPasswordMessage, verificationMessage) => {
        let messageToSend = '';
        const code = this.generateSixDigitCode();
        if (forgotPasswordMessage) {
            messageToSend = `
        <p>Hi there,</p>
        
        <p>It looks like you requested a password reset. If this was you, please use the following code to reset your password:</p>
        
        <p><strong>${code}</strong></p>

        <p>If you did not request a password reset, please ignore this email.</p>
        `;
        }
        else if (verificationMessage) {
            messageToSend = `
        <p>Hi there,</p>
        
        <p>It looks like you requested verification code from us. If this was you, please use the following code to verify your account:</p>

        <p><strong>${code}</strong></p>

        <p>If you did not request a verification code, please ignore this email.</p>
        `;
        }
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });
        await transporter.sendMail({
            from: 'Password Reset',
            to: to,
            subject: subject,
            html: messageToSend
        });
        return code;
    };
}
exports.default = new Utils();
