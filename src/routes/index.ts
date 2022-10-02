import express from 'express'

import authController from '../controllers/authController'
import userController from '../controllers/userController'
import productController from '../controllers/productController'
import shoppingCartController from '../controllers/shoppingCartController'

import { uploadImage } from '../services/storage/storage'

import userValidator from '../middleware/validators/userValidator'
import productValidator from '../middleware/validators/productValidator'
import authValidator from '../middleware/validators/authValidator'
import { getUserFromToken } from '../middleware/security/getUserFromToken'
import { checkAuth } from '../middleware/security/checkAuth'

const router = express.Router()

// ----------------
// AUTH
// ----------------

router.post('/auth/login', authValidator.validateLogin, authController.login)

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
// SHOPPING CARTS
// ----------------

router.post(
  '/shopping-carts',
  getUserFromToken,
  checkAuth('user'),
  shoppingCartController.createShoppingCart
)

router.get(
  '/shopping-carts',
  getUserFromToken,
  checkAuth('admin'),
  shoppingCartController.getShoppingCarts
)

router.get(
  '/shopping-carts/:id',
  getUserFromToken,
  checkAuth('user'),
  shoppingCartController.getShoppingCartById
)

router.patch(
  '/shopping-carts/:id/products/:id_product',
  getUserFromToken,
  checkAuth('user'),
  shoppingCartController.addProductToShoppingCart
)

router.patch(
  '/shopping-carts/:id/sell',
  getUserFromToken,
  checkAuth('user'),
  shoppingCartController.sellShoppingCart
)

router.delete(
  '/shopping-carts/:id',
  getUserFromToken,
  checkAuth('user'),
  shoppingCartController.deleteShoppingCartById
)

router.delete(
  '/shopping-carts/:id/products/:id_product',
  getUserFromToken,
  checkAuth('user'),
  shoppingCartController.deleteProductFromShoppinCart
)

export default router
