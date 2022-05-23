import express from 'express'
const model = require('./model')

const router = express.Router()
router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', validateProduct, addProduct)
router.put('/:id', validateProduct, updateProduct)
router.delete('/:id', deleteProductById)

function getProducts(req, res) {
  model.getAllProducts().then((products) => res.json({ products }))
}

function getProductById(req, res) {
  const { id } = req.params
  model
    .getProductById(id)
    .then((product) => res.json({ product }))
    .catch((_) => res.json({ product: null }))
}

function addProduct(req, res) {
  const { error } = req
  if (error && error.length > 0) {
    return res.json({ error })
  }
  const { title, price, thumbnail } = req.body
  model
    .addProduct({ title, price, thumbnail })
    .then((productId) => res.json({ productId }))
    .catch((_) => res.json({ productId: null }))
}

function updateProduct(req, res) {
  const { id } = req.params
  const { error } = req
  if (error && error.length > 0) {
    return res.json({ error })
  }
  const { title, price, thumbnail } = req.body
  model
    .updateProductById({ id, title, price, thumbnail })
    .then((productId) => res.json({ productId }))
    .catch((error) => {
      console.error(error)
      res.json({ productId: null })
    })
}

function deleteProductById(req, res) {
  const { id } = req.params
  model
    .deleteProductById(id)
    .then((id) => res.json({ idDeleted: id }))
    .catch((_) => res.json({ idDeleted: null }))
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
