import { NextFunction, Request, Response } from 'express'
import { check } from 'express-validator'
import { validateResult } from './validateResult'

const validateRegister = [
  check('email').exists().not().isEmpty().trim().escape().isEmail(),
  check('password')
    .exists()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .isLength({ min: 6 }),
  check('name').exists().not().isEmpty().trim().escape(),
  check('address').trim().escape(),
  check('phone').trim().escape(),
  (req: Request, res: Response, next: NextFunction) =>
    validateResult(req, res, next),
]

const validateUpdate = [
  check('name').exists().not().isEmpty().trim().escape(),
  check('address').trim().escape(),
  check('phone').trim().escape(),
]

export default {
  validateRegister,
  validateUpdate,
}
