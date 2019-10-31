const { Cinemas} = require('../utils/db')
const save = (data) => {
  const cinemas = new Cinemas(data)
  return cinemas.save()
}
const findOne = async (id) => {
  return await Cinemas.findById(id)
}
const findAll = async () => {
  return await Cinemas.find({}).sort({
    _id: -1
  })
}
const updata = async (data) => {
  return await Cinemas.findByIdAndUpdate(data.id, data)
}
const remove = async (id) => {
  return await Cinemas.findByIdAndRemove(id)
}
const search = async (keywords) => {
  let reg =new RegExp(keywords,'gi')
  return await Cinemas.find({}).or([{cinemaName:reg},{cinemaLocation:reg}])
}
module.exports = {
  save,
  findAll,
  updata,
  findOne,
  remove,
  search
}