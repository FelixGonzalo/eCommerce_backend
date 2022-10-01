import { NextFunction, Request, Response } from 'express'
import authService from '../business/authService'

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body
    const data = await authService.login({ email, password })
    res.status(201).json({ data })
  } catch (error) {
    next(error)
  }
}

export default {
  login,
}
