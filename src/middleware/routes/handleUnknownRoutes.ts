export function handleUnknownRoutes(req, res) {
  res.status(404).json({
    error: `Route ${req.originalUrl} with method ${req.method} not implemented`,
    status: 404,
    data: null,
  })
}
