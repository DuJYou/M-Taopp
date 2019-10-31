import postionhotControllers from '../controllers/position-hot'
import postionaboutControllers from '../controllers/position-about'
const movieHeaderView = require('../views/positionHeader.art')
class Position {
  constructor() {

  }

  render() {

    let movieHeaderHtml = movieHeaderView({});
    $('header').html(movieHeaderHtml);
    //当前城市
    let dzname = localStorage.cityname
 
    if(!dzname){
      $('.dzName').html('北京')
  }else{
    $('.dzName').html(dzname)
  }
    //城市选择
    $("header .dz").on('tap', function () {
      location.hash = `city`
    })
    //页尾
    $('footer').css('display', 'block')
    
    postionhotControllers.render()
    $(".select li").on('tap', function () {
      $(".select li").removeClass('active')
      $(this).addClass('active')

    })
    $(".hot-show").on('tap', function () {
      // location.hash = `positionhOT`
       location.hash = `position`
      postionhotControllers.render()
    })
    $(".about-show").on('tap', function () {
      location.hash = `positionAbout`
      postionaboutControllers.render()
    })
  }

}
export default new Position();