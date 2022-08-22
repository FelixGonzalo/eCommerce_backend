import { ShoppingCart } from '../mongoDb/models/ShoppingCart'
import { TShoppingCart } from '../types/TShoppingCart'

const add = (obj: TShoppingCart) => {
  const shoppingCart = new ShoppingCart<TShoppingCart>(obj)
  return shoppingCart.save()
}

const getAll = () => ShoppingCart.find()
const getById = (id: string) => ShoppingCart.findOne({ _id: id })
const updateById = (obj: TShoppingCart) =>
  ShoppingCart.findByIdAndUpdate(obj.id, obj)
const deleteById = (id: string) => ShoppingCart.findByIdAndDelete(id)

export default {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
}
