const multer = require('multer')

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, 'images')
    },
    filename(req, file, callback) {
      callback(null, `${new Date()}_${file.originalname}`)
    },
  }),
})

module.exports = upload
