import logger from '../../logger'
import { errorMessages, ErrorMessageType } from './errorDictionary'

export function errorHandler(err, req, res, next) {
  const errorMessage: ErrorMessageType = errorMessages[err.message]
  const message = errorMessage
    ? errorMessage.msg
    : err.message || 'Internal error'
  const status = errorMessage ? errorMessage.status : 500
  logger.error(`[${status}] ${message}`)
  res.status(status).json({
    error: message,
    status,
    data: null,
  })
}
