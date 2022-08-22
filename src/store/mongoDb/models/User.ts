import { Schema, model } from 'mongoose'
import { TUser } from '../../types/TUser'

export const userSchema = new Schema<TUser>({
  email: String,
  password: String,
  name: String,
  address: String,
  age: Number,
  phone: String,
  photo: String,
  type: String,
  timestamp: { type: Date, default: Date.now },
})

export const User = model<TUser>('User', userSchema)
