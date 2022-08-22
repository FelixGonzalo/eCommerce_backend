import { TProduct } from './TProduct'

export type TShoppingCart = {
  id?: string
  products?: TProduct[]
  user?: {
    id: string
    email: string
    name: string
  }
  status?: string
}
