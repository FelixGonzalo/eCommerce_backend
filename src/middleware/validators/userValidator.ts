import { NextFunction, Request, Response } from 'express'
import { check } from 'express-validator'
import { validateResult } from './validateResult'

const validateRegister = [
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
  check('name', 'The name is required')
    .exists()
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check('address').trim().escape(),
  check('phone').trim().escape(),
  (req: Request, res: Response, next: NextFunction) =>
    validateResult(req, res, next),
]

const validateUpdate = [
  check('name', 'The name is required')
    .exists()
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check('address').trim().escape(),
  check('phone').trim().escape(),
]

export default {
  validateRegister,
  validateUpdate,
}
