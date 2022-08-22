import { shoppingCartDao } from '../../store/daos'
import { TShoppingCart } from '../../store/types/TShoppingCart'

function addShoppingCartById({ user }: TShoppingCart) {
  return shoppingCartDao.add({ products: [], user })
}

function updateShoppingCart({ id, products, user }: TShoppingCart) {
  return shoppingCartDao.updateById({ id, products, user })
}

function getShoppingCartById(id: string) {
  return shoppingCartDao.getById(id)
}

function deleteShoppingCartById(id: string) {
  return shoppingCartDao.deleteById(id)
}

export default {
  getShoppingCartById,
  updateShoppingCart,
  addShoppingCartById,
  deleteShoppingCartById,
}
