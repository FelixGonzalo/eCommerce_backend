import { NextFunction, Request, Response } from 'express'
import { check } from 'express-validator'
import { validateResult } from './validateResult'

const validateLogin = [
  check('email').exists().not().isEmpty().trim().escape().isEmail(),
  check('password')
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
