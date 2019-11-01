const { MovieHot} = require('../utils/db')
const save = (data) => {
  const movieHot = new MovieHot(data)
  return movieHot.save()
}
const findOne = async (id) => {
  return await MovieHot.findById(id)
}
const findAll = async () => {
  return await MovieHot.find({}).sort({
    _id: -1
  })
}
const updata = async (data) => {
  return await MovieHot.findByIdAndUpdate(data.id, data)
}
const remove = async (id) => {
  return await MovieHot.findByIdAndRemove(id)
}
const search = async (keywords) => {
  let reg =new RegExp(keywords,'gi')
  return await MovieHot.find({}).or([{movieName:reg}])
}
module.exports = {
  save,
  findAll,
  updata,
  findOne,
  remove,
  search
}