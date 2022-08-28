import * as response from './response'
import jwt from 'jsonwebtoken'
import config from '../../config'

export function checkAuth(action) {
  function middleware(req, res, next) {
    const { type: userType } = req.user
    switch (action) {
      case 'admin':
        if (userType !== 'admin' && userType !== 'user') {
          return response.authFailed(req, res)
        }
        break
    }
    next()
  }
  return middleware
}

export function getUserFromToken(req, res, next) {
  const authorization = req.get('authorization')

  if (!authorization || !authorization.toLowerCase().startsWith('bearer')) {
    return response.error(req, res, 'token missing or invalid', 401)
  }

  const token: string = authorization.substring(7)
  const decodedToken: any = jwt.verify(token, config.SECRET_KEYWORD)

  if (!decodedToken?.id) {
    return response.error(req, res, 'token missing or invalid', 401)
  }

  req.user = {
    id: decodedToken._id,
    email: decodedToken.email,
    name: decodedToken.name,
    phone: decodedToken.phone,
    type: decodedToken.type,
  }
  next()
}
