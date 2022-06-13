import { Product } from '../mongoDb/models/Product'

const add = (obj) => {
  const product = new Product(obj)
  return product.save()
}

const getAll = () => Product.find()
const getById = (id) => Product.findOne({ _id: id })
const updateById = (obj) => Product.findByIdAndUpdate(obj.id, obj)
const deleteById = (id) => Product.findByIdAndDelete(id)

export default {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
}
