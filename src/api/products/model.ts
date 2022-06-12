const Contenedor = require('../../store/containers/FileContainer')
const productsDB = new Contenedor('products')

function addProduct({
  title,
  price,
  thumbnail,
  description,
  code,
  stock,
  timestamp,
}) {
  return productsDB.save({
    title,
    price,
    thumbnail,
    description,
    code,
    stock,
    timestamp,
  })
}

function getAllProducts() {
  return productsDB.getAll()
}

function getProductById(id) {
  return productsDB.getById(id)
}

function updateProductById({
  id,
  title,
  price,
  thumbnail,
  description,
  code,
  stock,
  timestamp,
}) {
  return productsDB.updateById({
    id,
    title,
    price,
    thumbnail,
    description,
    code,
    stock,
    timestamp,
  })
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
