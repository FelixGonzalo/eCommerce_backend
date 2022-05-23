import express from 'express'
const model = require('./model')
import * as response from '../../network/response'

const router = express.Router()
router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', validateProduct, addProduct)
router.put('/:id', validateProduct, updateProduct)
router.delete('/:id', deleteProductById)

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

function addProduct(req, res, next) {
  const { error } = req
  if (error && error.length > 0) {
    return response.error(req, res, error, 400)
  }
  const { title, price, thumbnail } = req.body
  model
    .addProduct({ title, price, thumbnail })
    .then((productId) => response.success(req, res, { productId }, 201))
    .catch(next)
}

function updateProduct(req, res, next) {
  const { id } = req.params
  const { error } = req
  if (error && error.length > 0) {
    return response.error(req, res, error, 400)
  }
  const { title, price, thumbnail } = req.body
  model
    .updateProductById({ id, title, price, thumbnail })
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
  const { title, price, thumbnail } = req.body
  if (!title || !price || !thumbnail || !title.trim() || !thumbnail.trim()) {
    req.error = 'faltan datos del producto'
  } else if (isNaN(price)) {
    req.error = 'El precio debe ser de tipo numérico'
  } else if (!thumbnail.includes('http')) {
    req.error = 'La URL de la foto debe iniciar con http'
  }
  req.title = title
  req.price = price
  req.thumbnail = thumbnail
  next()
}

export default router
