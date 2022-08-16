export default {
  API_PORT: process.env.API_PORT || 8080,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  MONGODB_USER: process.env.MONGODB_USER,
  FIREBASE_KEY: JSON.parse(process.env.FIREBASE_KEY),
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_ADMIN: process.env.EMAIL_ADMIN
}
