import { NextFunction, Request, Response } from "express"
import * as response from '../../network/response'

export function validateProduct(req: Request, res: Response, next: NextFunction) {
  const { title, price, thumbnail, description, code, stock } = req.body
  if (
    !title ||
    !price ||
    !description ||
    !code ||
    !stock ||
    !thumbnail ||
    !title.trim() ||
    !thumbnail.trim() ||
    !description.trim() ||
    !code.trim()
  ) {
    return response.error(req, res, 'faltan datos del producto', 400)
  } else if (isNaN(price)) {
    return response.error(req, res, 'El precio debe ser de tipo numérico', 400)
  } else if (isNaN(stock) || stock < 0) {
    return response.error(req, res, 'El stock debe ser de tipo numérico mayor o igual a 0', 400)
  } else if (!thumbnail.includes('http')) {
    return response.error(req, res, 'La URL de la foto debe iniciar con http', 400)
  }
  next()
}