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
