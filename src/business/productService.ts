import { errorCodes } from '../middleware/errors/errorDictionary'
import ProductRepository from '../persistence/repository/ProductRepository'
import { ProductDataType } from '../types/ProductType'

const productRepository = new ProductRepository()

const createProduct = async (product: ProductDataType) =>
  productRepository.save(product)

const getProducts = async () => productRepository.getAll()

const getProductById = async (id: string) => {
  try {
    const product = await productRepository.getById(id)
    if (!product) throw new Error(errorCodes.PRODUCT_NOT_FOUND)
    return product
  } catch (error) {
    throw error
  }
}

const updateProductById = async (id: string, product: ProductDataType) => {
  try {
    const updatedProduct = await productRepository.updateById(id, product)
    if (!updatedProduct) throw new Error(errorCodes.PRODUCT_NOT_FOUND)
    return updatedProduct
  } catch (error) {
    throw error
  }
}

const deleteProductById = async (id: string) => {
  try {
    const productId = await productRepository.deleteById(id)
    if (!productId) throw new Error(errorCodes.PRODUCT_NOT_FOUND)
    return productId
  } catch (error) {
    throw error
  }
}

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
}
