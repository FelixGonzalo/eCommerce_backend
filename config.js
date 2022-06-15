export default {
  API_PORT: process.env.API_PORT || 8080,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  MONGODB_USER: process.env.MONGODB_USER,
  FIREBASE_KEY: JSON.parse(process.env.FIREBASE_KEY),
}
