import express from 'express'
import userController from '../controllers/userController'
import productController from '../controllers/productController'
import userValidator from '../middleware/validators/userValidator'
import productValidator from '../middleware/validators/productValidator'
import { uploadImage } from '../services/storage/storage'
import authValidator from '../middleware/validators/authValidator'
import authController from '../controllers/authController'
import { getUserFromToken } from '../middleware/security/getUserFromToken'
import { checkAuth } from '../middleware/security/checkAuth'

const router = express.Router()

// ----------------
// PRODUCTS
// ----------------

router.post(
  '/products',
  getUserFromToken,
  checkAuth('admin'),
  productValidator.validateCreate,
  productController.createProduct
)

router.get('/products', productController.getProducts)
router.get('/products/:id', productController.getProductById)

router.put(
  '/products',
  getUserFromToken,
  checkAuth('admin'),
  productValidator.validateUpdate,
  productController.updateProductById
)

router.delete(
  '/products/:id',
  getUserFromToken,
  checkAuth('admin'),
  productController.deleteProductById
)

// ----------------
// USERS
// ----------------

router.post(
  '/users',
  uploadImage.single('photo'),
  userValidator.validateRegister,
  userController.createUser
)

router.get(
  '/users',
  getUserFromToken,
  checkAuth('admin'),
  userController.getUsers
)

router.get(
  '/users/:id',
  getUserFromToken,
  checkAuth('user'),
  userController.getUserById
)

router.put(
  '/users',
  uploadImage.single('photo'),
  getUserFromToken,
  checkAuth('user'),
  userValidator.validateUpdate,
  userController.updateUserById
)

// ----------------
// AUTH
// ----------------

router.post('/auth/login', authValidator.validateLogin, authController.login)

export default router
