import * as response from './response'

export function handleUnknownRoutes(req, res) {
  res.status(404).json({
    error: true,
    status: 404,
    description: `route ${req.originalUrl} with method ${req.method} not implemented`,
  })
}

export function errorHandler(err, req, res, next) {
  const message = err.message || 'Internal error'
  const status = err.statusCode || 500
  response.error(req, res, message, status)
}
