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
  res.status(status).json({
    error: true,
    status,
    data: message,
  })
}

export function auth(req, res, status = 203) {
  const messageTemplate = `route ${req.originalUrl} with method ${req.method} not authorized`
  res.status(status).json({
    error: false,
    status,
    data: messageTemplate,
  })
}
