export type ErrorMessageType = {
  code: string
  msg: string
  status: number
}

export const errorCodes = {
  TOKEN_INVALID: 'TOKEN_INVALID',
  WRONG_CREDENTIALS: 'WRONG_CREDENTIALS',
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
}

export const errorMessages = {
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
  USER_NOT_FOUND: {
    msg: 'The user does not exist',
    status: 404,
  },
}
