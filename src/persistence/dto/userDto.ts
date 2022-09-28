import { UserProfileType, UserType } from '../../types/UserType'

export const userProfileDto = (user: any) => {
  const data: UserProfileType = {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    phone: user.phone,
    photo: user.photo,
    type: user.type,
  }
  return data
}

export const userProfilesDto = (users: any) => {
  const data: UserProfileType[] = users.map((user: any) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    phone: user.phone,
    photo: user.photo,
    type: user.type,
  }))
  return data
}

export const userProfilesDtoForMongo = (users: any) => {
  const data: UserProfileType[] = users.map((user: any) => ({
    id: String(user._id),
    email: user.email,
    name: user.name,
    address: user.address,
    phone: user.phone,
    photo: user.photo,
    type: user.type,
  }))
  return data
}

export const userProfileDtoForMongo = (user: any) => {
  const data: UserProfileType = {
    id: String(user._id),
    email: user.email,
    name: user.name,
    address: user.address,
    phone: user.phone,
    photo: user.photo,
    type: user.type,
  }
  return data
}

export const userDtoForMongo = (user: any) => {
  const data: UserType = {
    id: String(user._id),
    email: user.email,
    password: user.password,
    name: user.name,
    address: user.address,
    phone: user.phone,
    photo: user.photo,
    type: user.type,
  }
  return data
}
