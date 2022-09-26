import { NextFunction, Request, Response } from 'express'
import { check } from 'express-validator'
import { validateResult } from './validateResult'

const validateCreate = [
  check('title').exists().not().isEmpty().trim().escape(),
  check('price').exists().isNumeric(),
  check('thumbnail').trim().escape(),
  check('description').trim().escape(),
  check('code').exists().not().isEmpty().trim().escape(),
  check('stock').exists().isNumeric(),
  (req: Request, res: Response, next: NextFunction) =>
    validateResult(req, res, next),
]

const validateUpdate = validateCreate

export default {
  validateCreate,
  validateUpdate,
}
