import { NextFunction, Request, Response } from 'express'
import userService from '../business/userService'

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
    const data = await userService.getUserById(id)
    res.json({ data })
  } catch (error) {
    next(error)
  }
}

async function updateUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, name, address, phone } = req.body
    const { filename } = req.file ? req.file : { filename: undefined }

    const data = await userService.updateUserById(id, {
      name,
      address: address || '',
      phone: phone || '',
      photo: filename || '',
    })
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
