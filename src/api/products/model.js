const Contenedor = require('../../store/contenedor')
const productsDB = new Contenedor('products')

function getAllProducts() {
  return productsDB.getAll()
}

function getProductById(id) {
  return productsDB.getById(id)
}

function addProduct({ title, price, thumbnail }) {
  return productsDB.save({ title, price, thumbnail })
}

function updateProductById({ id, title, price, thumbnail }) {
  return productsDB.updateById({ id, title, price, thumbnail })
}

function deleteProductById(id) {
  return productsDB.deleteById(id)
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
}
