// 显示layout
import indexController from '../controllers/'
import positionController from '../controllers/positions'
import positionAboutController from '../controllers/position-about'
import cinemaPositionController from '../controllers/cinemaPosition'
import myController from '../controllers/my'
import deatilController from '../controllers/detail'
import movieController from '../controllers/movieHome'
import cinemaSearchController from '../controllers/cinemaSearch'
import cinemaDetailController from '../controllers/cinemaDetail'
import datalmovieController from '../controllers/detailmovieHome'
import cityController from '../controllers/city'
import allCityController from '../controllers/allCity'


class Router {
  constructor() {
    this.render()
  }
  render() {
    window.addEventListener('load', this.handlePageload.bind(this))
    window.addEventListener('hashchange', this.handleHashchange.bind(this))
  }

  setActiveClass(hash) {
    $(`footer li[data-to=${hash}]`).addClass('active').siblings().removeClass('active')
  }

  renderDOM(hash) {
    let pageControllers = {
      positionController,
      cinemaPositionController,
      myController,
      deatilController,
      cinemaDetailController,
      cityController,
      positionAboutController,
      movieController,
      datalmovieController,
      cinemaSearchController,
      allCityController,
      // positionhOTController,
    }
    pageControllers[hash + 'Controller'].render()
  }
  handlePageload() {
    let hash = location.hash.substr(1) || 'position'

    indexController.render()
    // cityController.render()
    // cinemaDetailController.render()
    //detailController.render()

    location.hash = hash
    let reg = new RegExp('^(\\w+)', 'g')
    let path = reg.exec(hash)
    // console.log(path[1]);

    // 渲染DOM
    this.renderDOM(path[1])
    // 设置高亮
    this.setActiveClass(path[1])
  }

  handleHashchange(e) {
    let hash = location.hash.substr(1)
    let reg = new RegExp('^(\\w+)','g')
    let path = reg.exec(hash)
    // console.log(path[1]);

    // 渲染DOM
    this.renderDOM(path[1])
    // 设置高亮
    this.setActiveClass(path[1])
  }
}
new Router()
