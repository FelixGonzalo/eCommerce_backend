import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'storage')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = file.originalname.split('.').pop()
    cb(null, `${uniqueSuffix}.${ext}`)
  }
})

export const upload = multer({ storage })

export const uploadImage = multer({ 
  storage,
  fileFilter: function (req, file, cb) {
    let type = file.mimetype.startsWith('image/')
    type ? cb(null, true) : cb (null, false)
  }
})