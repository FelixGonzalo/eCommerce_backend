import twilio from 'twilio'
import config from '../../../config'
import logger from '../../logger'

const ACCOUNT_SID = config.WHATSAPP_SID
const AUTH_TOKEN = config.WHATSAPP_TOKEN
const FROM_PHONE = config.WHATSAPP_FROM
const client = twilio(ACCOUNT_SID, AUTH_TOKEN)

export const sendWhatsappMessage = async (phone: string, messageBody: string) => {
  if (!phone.trim() || !messageBody.trim() ) throw new Error('No se puede enviar un mensaje de WhatsApp sin datos')

  try {
    const info = await client.messages.create({
      body: messageBody,
      to: `whatsapp:${phone}`,
      from: `whatsapp:${FROM_PHONE}`,
    })
    return info
  } catch (error) {
    logger.warning(error)
  }
}