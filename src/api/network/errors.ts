export function handleUnknownRoutes(req, res) {
  res.status(404).json({
    error: true,
    description: `route ${req.originalUrl} with method ${req.method} not implemented`,
  })
}
