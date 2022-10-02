import logger from '../logger'
import { errorCodes } from '../middleware/errors/errorDictionary'
import ShoppingCartRepository from '../persistence/repository/ShoppingCartRepository'
import productService from './productService'
import userService from './userService'
import { sendMailToAdmin } from '../services/email/sendMail'
import { sendWhatsappMessage } from '../services/whatsapp/sendWhatsappMessage'
import { ShoppingCartDataType } from '../types/ShoppingCartType'
import { UserTokenType } from '../types/UserTokenType'

const shoppingCartRepository = new ShoppingCartRepository()

const createShoppingCart = async (user: UserTokenType) => {
  try {
    const userProfile = await userService.getUserById(user.id, user)
    return shoppingCartRepository.save({
      products: [],
      user: userProfile,
      status: 'created',
    })
  } catch (error) {
    throw error
  }
}

const getShoppingCarts = async () => shoppingCartRepository.getAll()

const getShoppingCartById = async (id: string, userToken: UserTokenType) => {
  try {
    const shoppingCart = await shoppingCartRepository.getById(id)
    if (!shoppingCart) throw new Error(errorCodes.SHOPPINGCART_NOT_FOUND)

    // -- If the user is not an administrator, you cannot see the data of another user
    if (userToken.id != shoppingCart.user.id && userToken.type !== 'admin')
      throw new Error(errorCodes.UNAUTHORIZED)

    return shoppingCart
  } catch (error) {
    throw error
  }
}

const updateShoppingCartById = async (
  id: string,
  shoppingCart: ShoppingCartDataType
) => {
  try {
    const updatedShoppingCart = await shoppingCartRepository.updateById(
      id,
      shoppingCart
    )
    if (!updatedShoppingCart) throw new Error(errorCodes.SHOPPINGCART_NOT_FOUND)
    return updatedShoppingCart
  } catch (error) {
    throw error
  }
}

const addProductToShoppingCart = async (
  shoppingCartId: string,
  productId: string,
  userToken: UserTokenType
) => {
  try {
    const shoppingCart = await getShoppingCartById(shoppingCartId, userToken)
    const product = await productService.getProductById(productId)

    // -- If the product exists in the cart it is not added
    const isProductInCart = shoppingCart.products.find((p) => p.id == productId)
    if (!isProductInCart)
      shoppingCart.products = [...shoppingCart.products, product]

    return updateShoppingCartById(shoppingCartId, shoppingCart)
  } catch (error) {
    throw error
  }
}

const sellShoppingCart = async (id: string, userToken: UserTokenType) => {
  try {
    const shoppingCart = await getShoppingCartById(id, userToken)

    // -- If the cart has been sold before, it cannot be sold again
    if (shoppingCart.status === 'sold')
      throw new Error(errorCodes.SHOPPINGCART_HAS_STATUS_SOLD_SO_CANNOT_BE_SOLD)
    // -- If the cart has no products, it cannot be sold
    if (shoppingCart.products.length === 0)
      throw new Error(errorCodes.SHOPPINGCART_HAS_NO_PRODUCTS)

    shoppingCart.status = 'sold'

    const subject = `Nuevo pedido de ${
      shoppingCart.user.name || 'desconocido'
    } con email ${shoppingCart.user.email || 'desconocido'}`

    const message = `productos del carrito: ${shoppingCart.products.map(
      (product, index) =>
        `\n ${index + 1}: ${product.title} | s/${product.price} | ${
          product.thumbnail
        }`
    )}`

    sendMailToAdmin(subject, message)
      .then(() => logger.info(`Correo enviado: ${subject}`))
      .catch((error) =>
        logger.error(`[sendMailToAdmin in sellShoppingCart] ${error.message}`)
      )

    if (shoppingCart.user.phone) {
      sendWhatsappMessage(shoppingCart.user.phone, subject).then(() =>
        logger.info(`WhatsApp enviado: ${subject}`)
      )
    }

    return updateShoppingCartById(id, shoppingCart)
  } catch (error) {
    throw error
  }
}

const deleteProductFromShoppinCart = async (
  shoppingCartId: string,
  productId: string,
  userToken: UserTokenType
) => {
  try {
    const shoppingCart = await getShoppingCartById(shoppingCartId, userToken)

    // -- If the cart has been sold before, it cannot be deleted
    if (shoppingCart.status === 'sold')
      throw new Error(
        errorCodes.SHOPPINGCART_HAS_STATUS_SOLD_SO_PRODUCTS_CANNOT_BE_DELETED
      )

    shoppingCart.products = shoppingCart.products.filter(
      (p) => p.id != productId
    )
    return updateShoppingCartById(shoppingCartId, shoppingCart)
  } catch (error) {
    throw error
  }
}

const deleteShoppingCartById = async (id: string, userToken: UserTokenType) => {
  try {
    const shoppingCart = await getShoppingCartById(id, userToken)
    if (!shoppingCart) throw new Error(errorCodes.SHOPPINGCART_NOT_FOUND)

    // -- If the cart has been sold before, it cannot be deleted
    if (shoppingCart.status === 'sold')
      throw new Error(
        errorCodes.SHOPPINGCART_HAS_STATUS_SOLD_SO_CANNOT_BE_DELETED
      )

    const shoppingCartId = await shoppingCartRepository.deleteById(id)
    if (!shoppingCartId) throw new Error(errorCodes.SHOPPINGCART_NOT_FOUND)

    return shoppingCartId
  } catch (error) {
    throw error
  }
}

export default {
  createShoppingCart,
  getShoppingCarts,
  getShoppingCartById,
  addProductToShoppingCart,
  sellShoppingCart,
  deleteProductFromShoppinCart,
  deleteShoppingCartById,
}
