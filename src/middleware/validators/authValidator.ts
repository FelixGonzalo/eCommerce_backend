import { NextFunction, Request, Response } from 'express'
import { check } from 'express-validator'
import { validateResult } from './validateResult'

const validateLogin = [
  check('email', 'The email is required')
    .exists()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .isEmail()
    .withMessage('The email format is wrong'),
  check('password', 'The password must be 6+ chars')
    .exists()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .isLength({ min: 6 }),
  (req: Request, res: Response, next: NextFunction) =>
    validateResult(req, res, next),
]

export default {
  validateLogin,
}
