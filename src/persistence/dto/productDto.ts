import { ProductType } from '../../types/ProductType'

export const productsDtoForMongo = (products: any) => {
  const formattedProducts: ProductType[] = products.map((product: any) => ({
    id: String(product._id),
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    description: product.description,
    code: product.code,
    stock: product.stock,
  }))
  return formattedProducts
}

export const productDtoForMongo = (product: any) => {
  const formattedProduct: ProductType = {
    id: String(product._id),
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    description: product.description,
    code: product.code,
    stock: product.stock,
  }
  return formattedProduct
}
