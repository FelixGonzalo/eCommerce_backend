const Contenedor = require('../../store/contenedor')
const productsDB = new Contenedor('products')

function addProduct({ title, price, thumbnail }) {
  return productsDB.save({ title, price, thumbnail })
}

function getAllProducts() {
  return productsDB.getAll()
}

function getProductById(id) {
  return productsDB.getById(id)
}

function updateProductById({ id, title, price, thumbnail }) {
  return productsDB.updateById({ id, title, price, thumbnail })
}

function deleteProductById(id) {
  return productsDB.deleteById(id)
}

export default {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
}
