import { NextFunction, Request, Response } from 'express'
import { check } from 'express-validator'
import { validateResult } from './validateResult'

const validateCreate = [
  check('title', 'Product title is required')
    .exists()
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check('price', 'Product price is required').exists().isNumeric(),
  check('thumbnail').trim().escape(),
  check('description').trim().escape(),
  check('code', 'Product code is required')
    .exists()
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check('stock', 'Product stock is a required number').exists().isNumeric(),
  (req: Request, res: Response, next: NextFunction) =>
    validateResult(req, res, next),
]

const validateUpdate = validateCreate

export default {
  validateCreate,
  validateUpdate,
}
