import { productDao } from '../../store/daos'

function addProduct({
  title,
  price,
  thumbnail,
  description,
  code,
  stock,
  timestamp,
}) {
  return productDao.add({
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
  return productDao.getAll()
}

function getProductById(id) {
  return productDao.getById(id)
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
  return productDao.updateById({
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
  return productDao.deleteById(id)
}

export default {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
}
