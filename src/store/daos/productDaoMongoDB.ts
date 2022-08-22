import { Product } from '../mongoDb/models/Product'
import { TProduct } from '../types/TProduct'

const add = (obj: TProduct) => {
  const product = new Product<TProduct>(obj)
  return product.save()
}

const getAll = () => Product.find()
const getById = (id: string) => Product.findOne({ _id: id })
const getByIds = (ids: string[]) => Product.find({ _id: { $in: ids } })
const updateById = (obj: TProduct) => Product.findByIdAndUpdate(obj.id, obj)
const deleteById = (id: string) => Product.findByIdAndDelete(id)

export default {
  add,
  getAll,
  getById,
  getByIds,
  updateById,
  deleteById,
}
