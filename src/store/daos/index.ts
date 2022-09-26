// import shoppingCartDaoFileSystem from './shoppingCartDaoFileSystem'
import shoppingCartDaoMongoDB from './shoppingCartDaoMongoDB'
import userDaoMongoDB from './userDaoMongoDB'

const shoppingCartDao = shoppingCartDaoMongoDB
const userDao = userDaoMongoDB

export { shoppingCartDao, userDao }
