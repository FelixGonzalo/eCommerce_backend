import ProductRepository from '../persistence/repository/ProductRepository'
import { ProductDataType } from '../types/ProductType'

const productRepository = new ProductRepository()

const createProduct = async (product: ProductDataType) =>
  productRepository.save(product)

const getProducts = async () => productRepository.getAll()

const getProductById = async (id: string) => productRepository.getById(id)

const updateProductById = async (id: string, product: ProductDataType) =>
  productRepository.updateById(id, product)

const deleteProductById = async (id: string) => productRepository.deleteById(id)

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
}
