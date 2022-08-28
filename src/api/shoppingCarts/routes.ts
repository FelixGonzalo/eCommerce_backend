import express from 'express'
import { checkAuth, getUserFromToken } from '../../network/secure'
import { addProductToShoppingCart, addShoppingCart, deleteProductFromShoppinCart, deleteShoppingCartById, getShoppingCartById, sellShoppingCart } from './controller'

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

export default router
