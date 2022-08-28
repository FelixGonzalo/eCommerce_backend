import { NextFunction, Request, Response } from 'express'
import model from './model'
import * as response from '../../network/response'

export function addProduct(req: Request, res: Response, next: NextFunction) {
  const { title, price, thumbnail, description, code, stock } = req.body
  model
    .addProduct({
      title,
      price,
      thumbnail,
      description,
      code,
      stock,
    })
    .then((productId) => response.success(req, res, { productId }, 201))
    .catch(next)
}

export function getProducts(req: Request, res: Response, next: NextFunction) {
  model
    .getAllProducts()
    .then((products) => response.success(req, res, products))
    .catch(next)
}

export function getProductById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params
  model
    .getProductById(id)
    .then((product) => response.success(req, res, product))
    .catch(next)
}

export function updateProduct(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params
  const { title, price, thumbnail, description, code, stock } = req.body
  model
    .updateProductById({
      id,
      title,
      price,
      thumbnail,
      description,
      code,
      stock,
    })
    .then((productId) => response.success(req, res, { productId }))
    .catch(next)
}

export function deleteProductById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params
  model
    .deleteProductById(id)
    .then((productId) => response.success(req, res, { productId }))
    .catch(next)
}