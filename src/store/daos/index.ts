// import productDaoFileSystem from './productDaoFileSystem'
// import shoppingCartDaoFileSystem from './shoppingCartDaoFileSystem'
// import productDaoFirebase from '../../store/daos/productDaoFirebase'
import productDaoMongoDB from './productDaoMongoDB'
import shoppingCartDaoMongoDB from './shoppingCartDaoMongoDB'
import userDaoMongoDB from './userDaoMongoDB'

const productDao = productDaoMongoDB
const shoppingCartDao = shoppingCartDaoMongoDB
const userDao = userDaoMongoDB

export { productDao, shoppingCartDao, userDao }
