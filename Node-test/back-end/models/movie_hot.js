const { MovieHot} = require('../utils/db')
const save = (data) => {
    const movieHot = new MovieHot(data)
    return movieHot.save()
  }
  const findAll = async () => {
    return await MovieHot.find({}).sort({
      _id: -1
    })
  }

  module.exports = {
    save,
    findAll
  }