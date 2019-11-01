import cinemaView from '../views/cinema.art'
import cinemaAddView from '../views/cinema_add.art'
import cinemaUpdataView from '../views/cinema_updata.art'
import httpModel from '../models/http'
function _handleAddClick(res) {
  $('#btn-add').on('click', () => {
    res.go('/cinema_add')
  })
}
function _handleUpdateClick(res, obj) {
  let id = $(obj).attr('data-id')
  res.go('/cinema_updata', {
    id
  })
}
async function _handleRemoveClick(res, obj) {
  let id = $(obj).attr('data-id')
  let result = await httpModel.add({
    url: '/api/cinema',
    type: 'delete',
    data: {
      id
    }
  })
  if (result) {
    res.go('/cinema?r=' + (new Date().getTime()))
    // res.go(req.url+'?r=' + (new Date().getTime()))
  }
}
async function _handleSearch(res,keywords) {
  let result = await httpModel.add({
    url: '/api/cinema/search',
    data: {
      keywords
    }
  })
  if (result.ret) {
    res.render(cinemaView({
      list: result.data.list
    }))
  }else{
    res.go('/cinema')
  }
}
export const list = async (req, res, next) => {
  let result = await httpModel.get({
    url: '/api/cinema'
  })
  if (result.ret) {
    res.render(cinemaView({
      list: result.data.list
    }))
    _handleAddClick(res)
  } else {
    res.go('/index')
  }
  //改
  $('.btn-updata').on('click', function () {
    _handleUpdateClick(res, this)
  })
  //删除
  $('.btn-remove').on('click', function () {
    _handleRemoveClick(res, this)
  })
  //查询
  $('body').on('keyup','#search',(e) => {
    if (e.keyCode === 13) {
      console.log(1);
      _handleSearch(res,e.target.value)
    }
  })
}
export const add =async (req, res, next) => {
  res.render(cinemaAddView())
  $('#posadd-submit').on('click', async () => {
    let $form = $('#cinema-form')
    let data = $form.serialize()
    let result = await httpModel.add({
      url: '/api/cinema',
      data,
    })
    if (result.ret) {
      $form[0].reset()
    } else {
      alert(result.data.message)
    }
  })
  $('#posadd-back').on('click', () => {
    res.go('/cinema')
  })
}
export const updata = async (req, res, next) => {
  let id = req.body.id
  let result = await httpModel.get({
    url: '/api/cinema/findOne',
    data: {
      id
    }
  })
  res.render(cinemaUpdataView({
    item: result.data
  }))
  $('#posdit-submit').on('click', async () => {
    let $form = $('#cinema-form')
    let data = $form.serialize()
    let result = await httpModel.add({
      url: '/api/cinema',
      data: data + '&id=' + id,
      type: 'patch'
    })
    if (result.ret) {
      res.go('/cinema')
    } else {
      alert(result.data.message)
    }
  })
  httpModel.add({
    url: 'api/cinema',
    type: 'patch',
    data: {
      id
    }
  })
  $('#posdit-back').on('click', () => {
    res.go('/cinema')
  })
}