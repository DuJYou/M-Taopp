import movieHotView from '../views/movie_hot.art'
import movieHotUpdataView from '../views/movie_hot_updata.art'
import movieHotAddView from '../views/movie_hot_add.art'
import httpModel from '../models/http'
import store from 'store'

function _handleAddClick(res) {
  $('#btn-Movieadd').on('click', () => {
    res.go('/movieHot_add')
  })
}

function _handleUpdateClick(res, obj) {
  let id = $(obj).attr('data-id')
  res.go('/movieHot_updata', {
    id
  })
}
async function _handleRemoveClick(res, obj) {
  let id = $(obj).attr('data-id')
  let result = await httpModel.add({
    url: '/api/movieHot',
    type: 'delete',
    data: {
      id
    }
  })
  if (result) {
    res.go('/movieHot?r=' + (new Date().getTime()))
    // res.go(req.url+'?r=' + (new Date().getTime()))
  }
}
async function _handleSearch(res, keywords) {
  let result = await httpModel.add({
    url: '/api/movieHot/search',
    data: {
      keywords
    }
  })
  if (result.ret) {
    res.render(movieHotView({
      list: result.data.list
    }))
  } else {
    res.go('/movieHot')
  }
}
export const list = async (req, res, next) => {
  let result = await httpModel.get({
    url: '/api/movieHot'
  })
  if (result.ret) {
    res.render(movieHotView({
      list: result.data.list
    }))
    _handleAddClick(res)
  } else {
    res.go('/index')
  }
  //改
  $('.btn-mupdata').on('click', function () {
    _handleUpdateClick(res, this)
  })
  //删除
  $('.btn-mremove').on('click', function () {
    _handleRemoveClick(res, this)
  })
  //查询
  $('body').on('keyup', '#Msearch', (e) => {
    if (e.keyCode === 13) {
      // console.log(1);
      _handleSearch(res, e.target.value)
    }
  })
}
export const add = async (req, res, next) => {
  res.render(movieHotAddView())

  let token = store.get('token')
  $('#movie-form').ajaxForm({
    restForm: true,
    headers: {
      'X-Access-Token': token
    }
    

  })
  $('#movieadd-back').on('click', () => {
    res.go('/movieHot')
  })
}
export const updata = async (req, res, next) => {
  let id = req.body.id
  // console.log(id);

  let result = await httpModel.get({
    url: '/api/movieHot/findOne',
    data: {
      id
    }
  })
  res.render(movieHotUpdataView({
    item: result.data
  }))
  $('#moviedit-submit').on('click', async () => {
    let $form = $('#movie-form')
    let data = $form.serialize()
    let result = await httpModel.add({
      url: '/api/movieHot',
      data: data + '&id=' + id,
      type: 'patch'
    })
    if (result.ret) {
      res.go('/movieHot')
    } else {
      alert(result.data.message)
    }
  })
  httpModel.add({
    url: 'api/movieHot',
    type: 'patch',
    data: {
      id
    }
  })
  $('#moviedit-back').on('click', () => {
    res.go('/movieHot')
  })
}