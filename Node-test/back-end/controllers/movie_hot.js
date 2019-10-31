const movieHotModel = require('../models/movie_hot.js')
const findAll = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8')
    let result = await movieHotModel.findAll()
    if (result) {
      res.render('succ', {
        data: JSON.stringify({
          list: result
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          list: []
        })
      })
    }
  }
  module.exports = {
    findAll
  }