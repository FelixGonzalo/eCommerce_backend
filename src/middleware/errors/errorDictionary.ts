export type ErrorMessageType = {
  code: string
  msg: string
  status: number
}

export const errorCodes = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  TOKEN_INVALID: 'TOKEN_INVALID',
  WRONG_CREDENTIALS: 'WRONG_CREDENTIALS',
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
  SHOPPINGCART_HAS_NO_PRODUCTS: 'SHOPPINGCART_HAS_NO_PRODUCTS',
  SHOPPINGCART_HAS_STATUS_SOLD_SO_CANNOT_BE_DELETED:
    'SHOPPINGCART_HAS_STATUS_SOLD_SO_CANNOT_BE_DELETED',
  SHOPPINGCART_HAS_STATUS_SOLD_SO_CANNOT_BE_SOLD:
    'SHOPPINGCART_HAS_STATUS_SOLD_SO_CANNOT_BE_SOLD',
  SHOPPINGCART_HAS_STATUS_SOLD_SO_PRODUCTS_CANNOT_BE_DELETED:
    'SHOPPINGCART_HAS_STATUS_SOLD_SO_PRODUCTS_CANNOT_BE_DELETED',
  SHOPPINGCART_NOT_FOUND: 'SHOPPINGCART_NOT_FOUND',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
}

export const errorMessages = {
  UNAUTHORIZED: {
    msg: 'Unauthorized',
    status: 401,
  },
  USER_ALREADY_EXISTS: {
    msg: 'The mail user already exists',
    status: 403,
  },
  TOKEN_INVALID: {
    msg: 'Token missing or invalid',
    status: 401,
  },
  WRONG_CREDENTIALS: {
    msg: 'Wrong credentials',
    status: 401,
  },
  PRODUCT_NOT_FOUND: {
    msg: 'The product does not exist',
    status: 404,
  },
  SHOPPINGCART_HAS_NO_PRODUCTS: {
    msg: 'The shopping cart has no products',
    status: 404,
  },
  SHOPPINGCART_HAS_STATUS_SOLD_SO_PRODUCTS_CANNOT_BE_DELETED: {
    msg: 'The shopping cart has the status sold so products cannot be deleted',
    status: 403,
  },
  SHOPPINGCART_HAS_STATUS_SOLD_SO_CANNOT_BE_DELETED: {
    msg: 'The shopping cart has the status sold so cannot be deleted',
    status: 403,
  },
  SHOPPINGCART_HAS_STATUS_SOLD_SO_CANNOT_BE_SOLD: {
    msg: 'The shopping cart has the status sold so cannot be sold again',
    status: 403,
  },
  SHOPPINGCART_NOT_FOUND: {
    msg: 'The shopping cart does not exist',
    status: 404,
  },
  USER_NOT_FOUND: {
    msg: 'The user does not exist',
    status: 404,
  },
}
