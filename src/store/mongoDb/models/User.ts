import { Schema, model } from 'mongoose'

export const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  address: String,
  age: Number,
  phone: String,
  photo: String,
  timestamp: { type: Date, default: Date.now },
})

export const User = model('User', userSchema)
