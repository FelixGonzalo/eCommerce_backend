export type ErrorMessageType = {
  code: string
  msg: string
  status: number
}

export const errorCodes = {
  WRONG_CREDENTIALS: 'WRONG_CREDENTIALS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
}

export const errorMessages = {
  WRONG_CREDENTIALS: {
    msg: 'Wrong credentials',
    status: 401,
  },
  USER_NOT_FOUND: {
    msg: 'The user does not exist',
    status: 404,
  },
  PRODUCT_NOT_FOUND: {
    msg: 'The product does not exist',
    status: 404,
  },
}
