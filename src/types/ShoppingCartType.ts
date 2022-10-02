import { ProductType } from './ProductType'
import { UserTokenType } from './UserTokenType'
import { UserProfileType } from './UserType'

type shoppingCartStatusType = 'created' | 'sold'

export type ShoppingCartType = {
  id: string
  products: ProductType[]
  user: UserProfileType
  status: shoppingCartStatusType
}

export type ShoppingCartDataType = {
  products: ProductType[]
  user: UserProfileType
  status: shoppingCartStatusType
}
