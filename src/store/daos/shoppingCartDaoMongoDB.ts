import { ShoppingCart } from '../mongoDb/models/ShoppingCart'

const add = (obj) => {
  const shoppingCart = new ShoppingCart(obj)
  return shoppingCart.save()
}

const getAll = () => ShoppingCart.find()
const getById = (id) => ShoppingCart.findOne({ _id: id })
const updateById = (obj) => ShoppingCart.findByIdAndUpdate(obj.id, obj)
const deleteById = (id) => ShoppingCart.findByIdAndDelete(id)

export default {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
}
