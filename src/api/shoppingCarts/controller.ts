import { NextFunction, Request, Response } from 'express'
import * as response from '../../network/response'
import model from './model'
import productModel from '../products/model'
import { sendMailToAdmin } from '../../services/email/sendMail'
import { sendWhatsappMessage } from '../../services/whatsapp/sendWhatsappMessage'
import logger from '../../logger'

export function addShoppingCart(req: Request, res: Response, next: NextFunction) {
  model
    .addShoppingCartById({ user: req["user"] })
    .then((shoppingCart) => response.success(req, res, shoppingCart))
    .catch(next)
}

export function getShoppingCartById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params
  model
    .getShoppingCartById(id)
    .then((shoppingCart) => response.success(req, res, shoppingCart))
    .catch(next)
}

export function deleteShoppingCartById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params
  model
    .deleteShoppingCartById(id)
    .then((shoppingCart) => response.success(req, res, shoppingCart))
    .catch(next)
}

export async function addProductToShoppingCart(req: Request, res: Response, next: NextFunction) {
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

export async function deleteProductFromShoppinCart(req: Request, res: Response, next: NextFunction) {
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

export async function sellShoppingCart(req: Request, res: Response, next: NextFunction) {
  // update product stock (pending management of several units per product)

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
      req["user"].name || 'desconocido'
    } con email ${req["user"].email || 'desconocido'}`

    const message = `productos del carrito: ${shoppingCartSold?.products?.map(
      (product, index) =>
        `\n ${index + 1}: ${product.title} | s/${product.price} | ${
          product.thumbnail
        }`
    )}`

    sendMailToAdmin(subject, message).then(() => logger.info((`Correo enviado: ${subject}`)))

    if (req["user"].phone) {
      sendWhatsappMessage(req["user"].phone, subject).then(() => logger.info((`WhatsApp enviado: ${subject}`)))
    }

    response.success(req, res, shoppingCart)
  } catch (error) {
    next(error)
  }
}