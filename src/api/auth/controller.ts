import express from 'express'
import model from './model'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import * as response from '../../network/response'
import config from '../../../config'
import { validateLogin, validateRegister } from './validation'
import { sendMailToAdmin } from '../../services/email/sendMail'

const router = express.Router()
router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)

async function register(req, res, next) {
  try {
    const { email, password, name, address, age, phone, photo } = req.body
    const passwordHash = await bcrypt.hash(password, 2)

    const user = await model.addUser({
      email,
      password: passwordHash,
      name,
      address,
      age,
      phone,
      photo,
      type: 'user',
    })

    sendMailToAdmin(
      'Nuevo registro',
      `email: ${email}, name: ${name}, address: ${address}, age: ${age}, phone: ${phone}, photo: ${photo}`
    ).then(() => console.log('correo enviado: Nuevo registro ' + email))

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

async function login(req, res, next) {
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
      type: user.type,
    },
    config.SECRET_KEYWORD,
    {
      expiresIn: 60 * 60 * 24 * 7,
    }
  )

  return token
}

export default router
