import { NextFunction, Request, Response } from 'express'
import shoppingCartService from '../business/shoppingCartService'
import { UserTokenType } from '../types/UserTokenType'

export async function createShoppingCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user: UserTokenType = req['user']
    const data = await shoppingCartService.createShoppingCart(user)
    res.status(201).json({ data })
  } catch (error) {
    next(error)
  }
}

async function getShoppingCarts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await shoppingCartService.getShoppingCarts()
    res.json({ data })
  } catch (error) {
    res.json({ data: [] })
  }
}

export async function getShoppingCartById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params
    const user: UserTokenType = req['user']
    const data = await shoppingCartService.getShoppingCartById(id, user)
    res.json({ data })
  } catch (error) {
    next(error)
  }
}

async function addProductToShoppingCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, id_product } = req.params
    const user: UserTokenType = req['user']
    const data = await shoppingCartService.addProductToShoppingCart(
      id,
      id_product,
      user
    )
    res.json({ data })
  } catch (error) {
    next(error)
  }
}

async function sellShoppingCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params
    const user: UserTokenType = req['user']
    const data = await shoppingCartService.sellShoppingCart(id, user)
    res.json({ data })
  } catch (error) {
    next(error)
  }
}

async function deleteProductFromShoppinCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, id_product } = req.params
    const user: UserTokenType = req['user']
    const data = await shoppingCartService.deleteProductFromShoppinCart(
      id,
      id_product,
      user
    )
    res.json({ data })
  } catch (error) {
    next(error)
  }
}

async function deleteShoppingCartById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params
    const user: UserTokenType = req['user']
    const data = await shoppingCartService.deleteShoppingCartById(id, user)
    res.json({ data })
  } catch (error) {
    next(error)
  }
}

export default {
  createShoppingCart,
  getShoppingCarts,
  getShoppingCartById,
  addProductToShoppingCart,
  sellShoppingCart,
  deleteProductFromShoppinCart,
  deleteShoppingCartById,
}
