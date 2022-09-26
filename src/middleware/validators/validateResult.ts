import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const validateResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error) {
    res.status(403)
    res.send({ errors: error.array() })
  }
}
