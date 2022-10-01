import { UserRol } from '../../types/UserType'
import { handleUnauthorizedRoutes } from '../routes/handleUnauthorizedRoutes'

export function checkAuth(action: UserRol) {
  function middleware(req, res, next) {
    const { type: userType } = req.user
    switch (action) {
      case 'admin':
        if (userType !== 'admin') {
          return handleUnauthorizedRoutes(req, res)
        }
        break
      case 'user':
        if (userType !== 'admin' && userType !== 'user') {
          return handleUnauthorizedRoutes(req, res)
        }
        break
    }
    next()
  }
  return middleware
}
