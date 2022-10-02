import jwt from 'jsonwebtoken'
import config from '../../../config'
import { errorCodes } from '../errors/errorDictionary'
import { UserTokenType } from '../../types/UserTokenType'

export function getUserFromToken(req, res, next) {
  try {
    const authorization = req.get('authorization')
    if (!authorization || !authorization.toLowerCase().startsWith('bearer'))
      throw new Error(errorCodes.TOKEN_INVALID)

    const token: string = authorization.substring(7)
    const decodedToken: any = jwt.verify(token, config.SECRET_KEYWORD)
    if (!decodedToken?.id) throw new Error(errorCodes.TOKEN_INVALID)

    const user: UserTokenType = {
      id: decodedToken.id,
      email: decodedToken.email,
      name: decodedToken.name,
      type: decodedToken.type,
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}
