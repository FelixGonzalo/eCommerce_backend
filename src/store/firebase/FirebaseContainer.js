const admin = require('firebase-admin')

export default class FirebaseContainer {
  constructor(collection) {
    this.db = admin.firestore()
    this.query = this.db.collection(collection)
  }

  async add(obj) {
    try {
      const res = await this.query.add(obj)
      return res
    } catch (error) {
      throw new Error(error)
    }
  }
  async getAll() {
    try {
      const res = await this.query.get()
      const data = []
      res.forEach((doc) => data.push(doc.data()))
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
  async getById(id) {
    try {
      const res = await this.query.doc(id).get()
      const data = res.data()
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
  async updateById(obj) {
    try {
      const res = await this.query.doc(obj.id).update(obj)
      return res
    } catch (error) {
      throw new Error(error)
    }
  }
  async deleteById(id) {
    try {
      const res = await this.query.doc(id).delete()
      return res
    } catch (error) {
      throw new Error(error)
    }
  }
}
