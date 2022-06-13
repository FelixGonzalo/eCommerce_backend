// import productDaoFileSystem from './productDaoFileSystem'
// import shoppingCartDaoFileSystem from './shoppingCartDaoFileSystem'
import productDaoMongoDB from './productDaoMongoDB'
import shoppingCartDaoMongoDB from './shoppingCartDaoMongoDB'

const productDao = productDaoMongoDB
const shoppingCartDao = shoppingCartDaoMongoDB
export { productDao, shoppingCartDao }
