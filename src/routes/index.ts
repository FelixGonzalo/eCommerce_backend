import express from 'express'
import productController from '../controllers/productController'
import productValidator from '../middleware/validators/productValidator'
// import { checkAuth, getUserFromToken } from 'src/network/secure'

const router = express.Router()

router.post(
  '/products',
  // getUserFromToken,
  // checkAuth('admin'),
  productValidator.validateCreate,
  productController.createProduct
)

router.get('/products', productController.getProducts)

router.get('/products/:id', productController.getProductById)
router.put(
  '/products',
  // getUserFromToken,
  // checkAuth('admin'),
  // validateProduct,
  productValidator.validateUpdate,
  productController.updateProductById
)
router.delete(
  '/products/:id' /*, getUserFromToken, checkAuth('admin')*/,
  productController.deleteProductById
)

export default router
