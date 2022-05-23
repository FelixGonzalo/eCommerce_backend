import express from 'express'
import model from './model'
import * as response from '../../network/response'
import { checkAuth } from '../../network/secure'

const router = express.Router()
router.post('/', checkAuth('admin'), validateProduct, addProduct)
router.get('/', getProducts)
router.get('/:id', getProductById)
router.put('/:id', checkAuth('admin'), validateProduct, updateProduct)
router.delete('/:id', checkAuth('admin'), deleteProductById)

function addProduct(req, res, next) {
  const { error } = req
  if (error && error.length > 0) {
    return response.error(req, res, error, 400)
  }
  const { title, price, thumbnail, description, code, stock } = req.body
  model
    .addProduct({
      title,
      price,
      thumbnail,
      description,
      code,
      stock,
      timestamp: Date.now(),
    })
    .then((productId) => response.success(req, res, { productId }, 201))
    .catch(next)
}

function getProducts(req, res, next) {
  model
    .getAllProducts()
    .then((products) => response.success(req, res, products))
    .catch(next)
}

function getProductById(req, res, next) {
  const { id } = req.params
  model
    .getProductById(id)
    .then((product) => response.success(req, res, product))
    .catch(next)
}

function updateProduct(req, res, next) {
  const { id } = req.params
  const { error } = req
  if (error && error.length > 0) {
    return response.error(req, res, error, 400)
  }
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
      timestamp: Date.now(),
    })
    .then((productId) => response.success(req, res, { productId }))
    .catch(next)
}

function deleteProductById(req, res, next) {
  const { id } = req.params
  model
    .deleteProductById(id)
    .then((productId) => response.success(req, res, { productId }))
    .catch(next)
}

function validateProduct(req, res, next) {
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
    req.error = 'faltan datos del producto'
  } else if (isNaN(price)) {
    req.error = 'El precio debe ser de tipo numérico'
  } else if (isNaN(stock) || stock < 0) {
    req.error = 'El stock debe ser de tipo numérico mayor o igual a 0'
  } else if (!thumbnail.includes('http')) {
    req.error = 'La URL de la foto debe iniciar con http'
  }
  req.title = title
  req.price = price
  req.thumbnail = thumbnail
  next()
}

export default router
