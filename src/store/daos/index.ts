import productDaoFileSystem from './productDaoFileSystem'
import shoppingCartDaoFileSystem from './shoppingCartDaoFileSystem'
// import productDaoMongoDB from './productDaoMongoDB'
// import shoppingCartDaoMongoDB from './shoppingCartDaoMongoDB'
// import productDaoFirebase from '../../store/daos/productDaoFirebase'

const productDao = productDaoFileSystem
const shoppingCartDao = shoppingCartDaoFileSystem
export { productDao, shoppingCartDao }
