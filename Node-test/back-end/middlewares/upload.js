const multer = require('multer')
const path = require('path')
const randomstring = require('randomstring')
// const fs = require('fs')
var filename=''
const mimetypeMap = {
    'image/png': '.png',
    'image/jpg': '.jpg',
    'image/jpeg': '.jpeg',
    'image/gif': '.gif'
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../public/uploads'))
    },
    filename: (req, file, cb) => {
        let {fieldname,mimetype} = file
       filename = fieldname + '-' + randomstring.generate(6) + mimetypeMap[mimetype]
        cb(null, filename)
    }
})
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.resolve(__dirname, '../public/uploads'))
//     },
//     filename: (req, file, cb) => {
//       let { fieldname, mimetype } = file
//       filename = fieldname + '-' + randomstring.generate(6) + mimetypeMap[mimetype]
//       cb(null, filename)
//     }
//   })
const upload = multer({
    storage
}).single('movieImg')


module.exports = (req, res, next) => {
    upload(req, res, (err) => {
        // if (filename) {
        //     fs.unlink(path.resolve(__dirname, '../public/uploads/' + req.body.tempCompanylogo), (err) => {
        //       if (err) {
        //         console.log(err.message)
        //       }
        //     })
        //   }
        console.log(filename);
        req.filename = filename
        next()
    })
}