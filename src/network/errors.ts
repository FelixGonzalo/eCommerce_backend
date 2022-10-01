export function handleUnknownRoutes(req, res) {
  res.status(404).json({
    error: true,
    status: 404,
    description: `route ${req.originalUrl} with method ${req.method} not implemented`,
  })
}
