export function handleUnauthorizedRoutes(req, res) {
  res.status(401).json({
    error: `Route ${req.originalUrl} with method ${req.method} not authorized`,
    status: 401,
    data: null,
  })
}
