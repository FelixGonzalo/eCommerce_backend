import { NextFunction, Request, Response } from 'express'
import model from './model'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import * as response from '../../network/response'
import config from '../../../config'
import { sendMailToAdmin } from '../../services/email/sendMail'
import logger from '../../logger'

export async function register (req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, name, address, age, phone, photo } = req.body
    const { filename } = req.file ? req.file : { filename: undefined }

    const passwordHash = await bcrypt.hash(password, 2)

    const user = await model.addUser({
      email,
      password: passwordHash,
      name,
      address,
      age,
      phone,
      photo: filename,
      type: 'user',
    })

    sendMailToAdmin(
      'Nuevo registro',
      `email: ${email}, name: ${name}, address: ${address}, age: ${age}, phone: ${phone}, photo: ${photo}`
    ).then(() => logger.info('correo enviado: Nuevo registro ' + email))

    const token = createUserToken(user)

    response.success(
      req,
      res,
      {
        email: user.email,
        name: user.name,
        token,
      },
      201
    )
  } catch (error) {
    next(error)
  }
}

export async function login (req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body
    const user = await model.getUserByEmail(email)

    if (!user) return response.error(req, res, 'Credenciales incorrectas', 401)

    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword)
      return response.error(req, res, 'Credenciales incorrectas', 401)

    const token = createUserToken(user)

    response.success(
      req,
      res,
      {
        email: user.email,
        name: user.name,
        photo: `${req.protocol}://${req.get('host')}/public/${user.photo}`,
        token,
      },
      200
    )
  } catch (error) {
    next(error)
  }
}

function createUserToken(user) {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      type: user.type,
    },
    config.SECRET_KEYWORD,
    {
      expiresIn: 60 * 60 * 24 * 7,
    }
  )

  return token
}
