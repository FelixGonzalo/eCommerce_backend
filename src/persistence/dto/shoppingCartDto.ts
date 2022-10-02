import { ShoppingCartType } from '../../types/ShoppingCartType'

export const shoppingCartsDtoForMongo = (shoppingCarts: any) => {
  const formattedShoppingCarts: ShoppingCartType[] = shoppingCarts.map(
    (shoppingCart: any) => ({
      id: String(shoppingCart._id),
      products: shoppingCart.products,
      user: shoppingCart.user,
      status: shoppingCart.status,
    })
  )
  return formattedShoppingCarts
}

export const shoppingCartDtoForMongo = (shoppingCart: any) => {
  const formattedShoppingCart: ShoppingCartType = {
    id: String(shoppingCart._id),
    products: shoppingCart.products,
    user: shoppingCart.user,
    status: shoppingCart.status,
  }
  return formattedShoppingCart
}
