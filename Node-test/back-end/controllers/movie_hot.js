const movieHotModel = require('../models/movie_hot.js')
// const moment = require('moment')
// const fs = require('fs')
// const path = require('path')
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
const findOne = async (req, res, next) => {
  let id = req.query.id
  let result = await movieHotModel.findOne(id)
  if (result) {
    res.render('succ', {
      data: JSON.stringify(result)
    })
  } else {
    res.render('fail', {
      data: JSON.stringify(result)
    })
  }
}
const save = async (req, res, next) => {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let data = req.body
  data.movieImg=req.filename
  
  let result = await movieHotModel.save(data)

  // console.log(data);

  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        message: '添加成功'
      })
    })
  } else {
    res.render('succ', {
      data: JSON.stringify({
        message: '添加失败'
      })
    })
  }
}
const updata = async (req, res, next) => {
  let data = req.body
  let result = await movieHotModel.updata(data)
  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        message: '修改成功'
      })
    })
  } else {
    res.render('succ', {
      data: JSON.stringify({
        message: '修改失败'
      })
    })
  }
}
const remove = async (req, res, next) => {
  let id = req.body.id
  let result = await movieHotModel.remove(id)
  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        message: '删除成功'
      })
    })
  } else {
    res.render('succ', {
      data: JSON.stringify({
        message: '删除失败'
      })
    })
  }
}
const search =async(req,res,next)=>{
  let {keywords}=req.body
  let result =await movieHotModel.search(keywords)
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
  findAll,
  save,
  updata,
  findOne,
  remove,
  search
}