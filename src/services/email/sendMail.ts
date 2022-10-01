import nodemailer from 'nodemailer'
import config from '../../../config'

const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASSWORD,
  },
})

export const sendMailToAdmin = async (asunto: string, mensaje: string) => {
  try {
    if (!asunto || !mensaje)
      throw new Error('Can not send an email without data')
    const info = await transporter.sendMail({
      from: config.EMAIL_USER,
      to: config.EMAIL_ADMIN,
      subject: asunto,
      text: mensaje,
    })
    return info
  } catch (error) {
    throw error
  }
}
