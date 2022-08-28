import logger from "../logger"

export function success(req, res, data, status = 200) {
  res.status(status).json({
    error: false,
    status,
    data,
  })
}

export function error(
  req,
  res,
  message = 'Internal server error',
  status = 500
) {
  logger.error(`[${status}] ${message}`)
  res.status(status).json({
    error: true,
    status,
    data: message,
  })
}

export function authFailed(req, res, status = 401) {
  const messageTemplate = `route ${req.originalUrl} with method ${req.method} not authorized`
  logger.warning(`[${status}] ${messageTemplate}`)
  res.status(status).json({
    error: false,
    status,
    data: messageTemplate,
  })
}
