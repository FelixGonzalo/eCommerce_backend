import express from 'express'
import * as response from '../../network/response'
import model from './model'
import productModel from '../products/model'
import { checkAuth, getUserFromToken } from '../../network/secure'
import { sendMailToAdmin } from '../../services/email/sendMail'

const router = express.Router()
router.post('/', getUserFromToken, checkAuth('user'), addShoppingCart)
router.delete(
  '/:id',
  getUserFromToken,
  checkAuth('user'),
  deleteShoppingCartById
)
router.get(
  '/:id/products',
  getUserFromToken,
  checkAuth('user'),
  getShoppingCartById
)
router.patch(
  '/:id/products/:id_prod',
  getUserFromToken,
  checkAuth('user'),
  addProductToShoppingCart
)
router.delete(
  '/:id/products/:id_prod',
  getUserFromToken,
  checkAuth('user'),
  deleteProductFromShoppinCart
)
router.patch('/:id/sell', getUserFromToken, checkAuth('user'), sellShoppingCart)

function addShoppingCart(req, res, next) {
  console.log('user', req.user)
  model
    .addShoppingCartById({ user: req.user })
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
    if (shoppingCart?.products) {
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

    if (!shoppingCart?.products) {
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

async function sellShoppingCart(req, res, next) {
  // update product stock (pending management of several units per product)
  // whatsapp message

  try {
    const { id } = req.params

    const shoppingCart = await model.getShoppingCartById(id)

    if (!shoppingCart || shoppingCart.status === 'sold') {
      return response.error(
        req,
        res,
        'El carrito de compra ya ha sido vendido anteriormente',
        400
      )
    }

    const { products } = shoppingCart
    if (!products || !Array.isArray(products) || products.length === 0) {
      return response.error(
        req,
        res,
        'El carrito de compra no tiene productos',
        400
      )
    }

    const productIds: any = products.map((product) => product.id)
    const currentProducts = await productModel.getProductsByIds(productIds)
    const noStock = currentProducts.find((product) => product.stock === 0)
    if (noStock) {
      return response.error(req, res, 'No hay stock para los productos', 400)
    }

    const shoppingCartSold = await model.updateStatusFromShoppingCart({
      id,
      status: 'sold',
    })

    const subject = `Nuevo pedido de ${
      req.user.name || 'desconocido'
    } con email ${req.user.email || 'desconocido'}`

    const message = `productos del carrito: ${shoppingCartSold?.products?.map(
      (product, index) =>
        `\n ${index + 1}: ${product.title} | s/${product.price} | ${
          product.thumbnail
        }`
    )}`

    sendMailToAdmin(subject, message).then(() =>
      console.log(`Correo enviado: ${subject}`)
    )

    response.success(req, res, shoppingCart)
  } catch (error) {
    next(error)
  }
}

export default router
