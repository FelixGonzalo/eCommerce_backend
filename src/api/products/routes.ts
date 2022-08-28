import express from 'express'
import { checkAuth, getUserFromToken } from '../../network/secure'
import { addProduct, deleteProductById, getProductById, getProducts, updateProduct } from './controller'
import { validateProduct } from './validation'

const router = express.Router()
router.post(
  '/',
  getUserFromToken,
  checkAuth('admin'),
  validateProduct,
  addProduct
)
router.get('/', getProducts)
router.get('/:id', getProductById)
router.put(
  '/:id',
  getUserFromToken,
  checkAuth('admin'),
  validateProduct,
  updateProduct
)
router.delete('/:id', getUserFromToken, checkAuth('admin'), deleteProductById)

export default router