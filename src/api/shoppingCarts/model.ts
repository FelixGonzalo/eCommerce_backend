import { shoppingCartDao } from '../../store/daos'

function addShoppingCartById() {
  return shoppingCartDao.add({})
}

function updateShoppingCart({ id, products }) {
  return shoppingCartDao.updateById({ id, products })
}

function getShoppingCartById(id) {
  return shoppingCartDao.getById(id)
}

function deleteShoppingCartById(id) {
  return shoppingCartDao.deleteById(id)
}

export default {
  getShoppingCartById,
  updateShoppingCart,
  addShoppingCartById,
  deleteShoppingCartById,
}
