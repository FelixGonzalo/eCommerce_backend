import express from 'express'
import * as response from '../../network/response'
import model from './model'
import productModel from '../products/model'

const router = express.Router()
router.post('/', addShoppingCart)
router.delete('/:id', deleteShoppingCartById)
router.get('/:id/products', getShoppingCartById)
router.post('/:id/products/:id_prod', addProductToShoppingCart)
router.delete('/:id/products/:id_prod', deleteProductFromShoppinCart)

function addShoppingCart(req, res, next) {
  model
    .addShoppingCartById()
    .then((shoppingCart) => response.success(req, res, shoppingCart))
    .catch(next)
}

function getShoppingCartById(req, res, next) {
  const { id } = req.params
  model
    .getShoppingCartById(id)
    .then((shoppingCart) => response.success(req, res, shoppingCart))
    .catch(next)
}

function deleteShoppingCartById(req, res, next) {
  const { id } = req.params
  model
    .deleteShoppingCartById(id)
    .then((shoppingCart) => response.success(req, res, shoppingCart))
    .catch(next)
}

async function addProductToShoppingCart(req, res, next) {
  const { id, id_prod } = req.params

  try {
    const shoppingCart = await model.getShoppingCartById(id)
    const product = await productModel.getProductById(id_prod)

    if (!product) {
      return
    }

    let updatedProducts
    if (shoppingCart.products) {
      const exists = shoppingCart.products.find((item) => item.id == id_prod)
      if (exists)
        return response.error(
          req,
          res,
          'The product is already in the cart',
          400
        )

      updatedProducts = [...shoppingCart.products, product]
    } else {
      updatedProducts = [product]
    }

    const shoppingCartUpdated = await model.updateShoppingCart({
      id,
      products: updatedProducts,
    })
    response.success(req, res, shoppingCartUpdated)
  } catch (error) {
    next(error)
  }
}

async function deleteProductFromShoppinCart(req, res, next) {
  const { id, id_prod } = req.params

  try {
    const shoppingCart = await model.getShoppingCartById(id)

    if (!shoppingCart.products) {
      return response.error(req, res, 'The shopping cart is empty', 400)
    }

    const updatedProducts = shoppingCart.products.filter(
      (item) => item.id != id_prod
    )

    const shoppingCartUpdated = await model.updateShoppingCart({
      id,
      products: updatedProducts,
    })

    response.success(req, res, shoppingCartUpdated)
  } catch (error) {
    next(error)
  }
}

export default router
