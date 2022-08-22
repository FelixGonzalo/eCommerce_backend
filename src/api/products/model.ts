import { productDao } from '../../store/daos'
import { TProduct } from '../../store/types/TProduct'

function addProduct({
  title,
  price,
  thumbnail,
  description,
  code,
  stock,
}: TProduct) {
  return productDao.add({
    title,
    price,
    thumbnail,
    description,
    code,
    stock,
  })
}

function getAllProducts() {
  return productDao.getAll()
}

function getProductById(id: string) {
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
}: TProduct) {
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

function deleteProductById(id: string) {
  return productDao.deleteById(id)
}

function getProductsByIds(ids: string[]) {
  return productDao.getByIds(ids)
}

export default {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductsByIds,
}
