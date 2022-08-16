import express from 'express'
import model from './model'
import * as response from '../../network/response'
import bcrypt from 'bcrypt'
import { sendMailToAdmin } from '../../services/email/sendMail'

const router = express.Router()
router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

async function register(req, res, next) {
  const { email, password, name, address, age, phone, photo } = req.body
  const passwordHash = await bcrypt.hash(password, 2)

  model
    .addUser({
      email,
      password: passwordHash,
      name,
      address,
      age,
      phone,
      photo,
    })
    .then((user) => {
      sendMailToAdmin('Bienvenido al sitema ECOMMERCE', `
        email: ${email}, name: ${name}, address: ${address}, age: ${age}, phone: ${phone}, photo: ${photo}
      `)
      .then((result) => {
        response.success(req, res, { user }, 201)
      })
      .catch(next)
    })
    .catch(next)
}

async function login(req, res, next) {
  const { email, password } = req.body

  model
    .getUserByEmail(email)
    .then((user) => {
      if (!user)
        return response.error(req, res, 'Credenciales incorrectas', 400)
      console.log('mira', user.password)
      bcrypt.compare(password, user.password).then(function (result) {
        if (!result)
          return response.error(req, res, 'Credenciales incorrectas', 400)

        return response.success(req, res, 'Login correcto', 200)
      })
    })
    .catch(next)
}

async function validateRegister(req, res, next) {
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

function validateLogin(req, res, next) {
  const { email, password } = req.body
  if (!email || !password || !email.trim() || !password.trim())
    return response.error(req, res, 'Es necesario el email y el password', 400)

  if (!emailRegex.test(email))
    return response.error(req, res, 'El formato del correo es incorrecto', 400)
  next()
}

export default router
