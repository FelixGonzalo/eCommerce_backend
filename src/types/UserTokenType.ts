import { UserRol } from './UserType'

export type UserTokenType = {
  id: string
  email: string
  name: string
  phone: string
  type: UserRol
}
