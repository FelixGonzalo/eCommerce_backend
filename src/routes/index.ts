import express from 'express'
import userController from '../controllers/userController'
import productController from '../controllers/productController'
import userValidator from '../middleware/validators/userValidator'
import productValidator from '../middleware/validators/productValidator'
import { uploadImage } from '../services/storage/storage'
// import { checkAuth, getUserFromToken } from 'src/network/secure'

const router = express.Router()

/* PRODUCTS */

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

/* USERS */

router.post(
  '/users',
  uploadImage.single('photo'),
  userValidator.validateRegister,
  userController.createUser
)

router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUserById)

router.put(
  '/users',
  uploadImage.single('photo'),
  userValidator.validateUpdate,
  userController.updateUserById
)

// router.post('/login', validateLogin, login)

export default router
