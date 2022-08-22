import { shoppingCartDao } from '../../store/daos'
import { TShoppingCart } from '../../store/types/TShoppingCart'

function addShoppingCartById({ user }: TShoppingCart) {
  return shoppingCartDao.add({ products: [], user })
}

function updateShoppingCart({ id, products }: TShoppingCart) {
  return shoppingCartDao.updateById({ id, products })
}

function getShoppingCartById(id: string) {
  return shoppingCartDao.getById(id)
}

function deleteShoppingCartById(id: string) {
  return shoppingCartDao.deleteById(id)
}

function updateStatusFromShoppingCart({ id, status }: TShoppingCart) {
  return shoppingCartDao.updateById({ id, status })
}

export default {
  getShoppingCartById,
  updateShoppingCart,
  addShoppingCartById,
  deleteShoppingCartById,
  updateStatusFromShoppingCart,
}
