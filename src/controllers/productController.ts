import { NextFunction, Request, Response } from 'express'
import productService from '../business/productService'

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { title, price, thumbnail, description, code, stock } = req.body
    const data = await productService.createProduct({
      title,
      price,
      thumbnail: thumbnail || '',
      description: description || '',
      code,
      stock,
    })
    res.status(201).json({ data })
  } catch (error) {
    next(error)
  }
}

async function getProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await productService.getProducts()
    res.json({ data })
  } catch (error) {
    res.json({ data: [] })
  }
}

async function getProductById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const data = await productService.getProductById(id)
    res.json({ data })
  } catch (error) {
    next(error)
  }
}

async function updateProductById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, title, price, thumbnail, description, code, stock } = req.body
    const data = await productService.updateProductById(id, {
      title,
      price,
      thumbnail: thumbnail || '',
      description: description || '',
      code,
      stock,
    })
    res.json({ data })
  } catch (error) {
    next(error)
  }
}

async function deleteProductById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params
    const data = await productService.deleteProductById(id)
    res.json({ data })
  } catch (error) {
    next(error)
  }
}

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
}
