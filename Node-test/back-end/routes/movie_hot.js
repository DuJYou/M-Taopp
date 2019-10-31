var express = require('express')
var router = express.Router()
let movieHot = require('../controllers/movie_hot')
router.get('/findAll', movieHot.findAll)
module.exports = router