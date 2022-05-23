import * as response from './response'

const admin = true

export function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case 'admin':
        if (admin) {
          next()
        } else {
          response.auth(req, res)
        }
        break
      default:
        next()
        break
    }
  }
  return middleware
}
