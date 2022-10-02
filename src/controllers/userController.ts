import { NextFunction, Request, Response } from 'express'
import userService from '../business/userService'
import logger from '../logger'
import { sendMailToAdmin } from '../services/email/sendMail'
import { UserTokenType } from '../types/UserTokenType'

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password, name, address, phone } = req.body
    const { filename } = req.file ? req.file : { filename: undefined }
    const data = await userService.createUser({
      email,
      password,
      name,
      address: address || '',
      phone: phone || '',
      photo: filename || '',
      type: 'user',
    })

    sendMailToAdmin(
      'Nuevo registro',
      `Datos del usuario: \nemail: ${email} \nname: ${name} \naddress: ${address} \nphone: ${phone} \nphoto: ${
        filename || ''
      }`
    ).catch((error) =>
      logger.error(`[sendMailToAdmin in createUser] ${error.message}`)
    )

    res.status(201).json({ data })
  } catch (error) {
    next(error)
  }
}

async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await userService.getUsers()
    res.json({ data })
  } catch (error) {
    res.json({ data: [] })
  }
}

async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const user: UserTokenType = req['user']
    const data = await userService.getUserById(id, user)
    res.json({ data })
  } catch (error) {
    next(error)
  }
}

async function updateUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, name, address, phone } = req.body
    const { filename } = req.file ? req.file : { filename: undefined }
    const user: UserTokenType = req['user']
    const data = await userService.updateUserById(
      id,
      {
        name,
        address: address || '',
        phone: phone || '',
        photo: filename || '',
      },
      user
    )
    res.json({ data })
  } catch (error) {
    next(error)
  }
}

export default {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
}
