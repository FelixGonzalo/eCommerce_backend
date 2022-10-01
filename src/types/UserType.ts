export type UserRol = 'user' | 'admin'

export type UserType = {
  id: string
  email: string
  password: string
  name: string
  address: string
  phone: string
  photo: string
  type: UserRol
}

export type UserDataType = {
  email: string
  password: string
  name: string
  address: string
  phone: string
  photo: string
  type: UserRol
}

export type UserEditType = {
  name: string
  address: string
  phone: string
  photo: string
}

export type UserProfileType = {
  id: string
  email: string
  name: string
  address: string
  phone: string
  photo: string
  type: UserRol
}

export type UserAuthType = {
  email: string
  password: string
}
