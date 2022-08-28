import model from './model'
import * as response from '../../network/response'
import { NextFunction, Request, Response } from 'express'

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

async function validateRegister(req: Request, res: Response, next: NextFunction) {
  const { email, password, age } = req.body
  if (!email || !password || !email.trim() || !password.trim())
    return response.error(req, res, 'Es necesario el email y el password', 400)

  if (password.length < 6)
    return response.error(
      req,
      res,
      'El password debe tener mínimo 6 caracteres',
      400
    )

  if (age && isNaN(age))
    return response.error(req, res, 'La edad debe ser un número', 400)

  if (!emailRegex.test(email))
    return response.error(req, res, 'El correo es incorrecto', 400)

  try {
    const userExists = await model.getUserByEmail(email)
    if (userExists) return response.error(req, res, 'El correo ya existe', 400)
  } catch (error) {
    return response.error(
      req,
      res,
      'Error al verificar si el correo ya existe',
      500
    )
  }

  next()
}

function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body
  if (!email || !password || !email.trim() || !password.trim())
    return response.error(req, res, 'Es necesario el email y el password', 400)

  if (!emailRegex.test(email))
    return response.error(req, res, 'El formato del correo es incorrecto', 400)
  next()
}

export { validateRegister, validateLogin }
