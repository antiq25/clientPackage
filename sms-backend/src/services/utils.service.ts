import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

class Utils {
  public hashPassword = async (
    password: string
  ): Promise<{ salt: string; hash: string }> => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    return { salt, hash }
  }

  public comparePassword = async (
    password: string,
    salt: string,
    hash: string
  ): Promise<boolean> => {
    const newHash = await bcrypt.hash(password, salt)

    return newHash === hash
  }

  public generateSixDigitCode = (): string => {
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    return code
  }

  public sendEmail = async (
    to: string,
    subject: string,
    forgotPasswordMessage: boolean,
    verificationMessage: boolean
  ) => {
    let messageToSend = ''
    const code = this.generateSixDigitCode()

    if (forgotPasswordMessage) {
      messageToSend = `
        <p>Hi there,</p>
        
        <p>It looks like you requested a password reset. If this was you, please use the following code to reset your password:</p>
        
        <p><strong>${code}</strong></p>

        <p>If you did not request a password reset, please ignore this email.</p>
        `
    } else if (verificationMessage) {
      messageToSend = `
        <p>Hi there,</p>
        
        <p>It looks like you requested verification code from us. If this was you, please use the following code to verify your account:</p>

        <p><strong>${code}</strong></p>

        <p>If you did not request a verification code, please ignore this email.</p>
        `
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    })

    await transporter.sendMail({
      from: 'Password Reset',
      to: to,
      subject: subject,
      html: messageToSend
    })

    return code
  }
}

export default new Utils()
