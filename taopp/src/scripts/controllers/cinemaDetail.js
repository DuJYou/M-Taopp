const cinemaDetaView = require('../views/cinemaDetail.art')
const cinemaDetaHeaderView = require('../views/cinemaDetailHeader.art')
const cinemaDetaSessionView = require('../views/cinemaDetail-session.art')
const cinemaDetaMovdeView = require('../views/cinemaDetail-movde.art')
const cinemaDetaModels = require('../models/cinemaDetailModdels')
const layout=require("./index");
class CinemaDetail {
  constructor() {}
  async render() {
    layout.default.render();
    //获取hash 根据hash通过get获取数据传入
    let hash = location.hash.substr(1)
    let reg = new RegExp('^(\\w+)(\\/)(\\w+)', 'g')
    let path = reg.exec(hash)
    let a = path[3];
    let cinemaDetModels = await cinemaDetaModels.get({ 
      Cid: a
    })
    let list = cinemaDetModels
    // console.log(list);
    
    let imgleng = cinemaDetModels.showData.movies
    //渲染电影院信息
    let cinemaDetaViewHtml = cinemaDetaView({
      list
    })
    $('main').html(cinemaDetaViewHtml)
    //头标题（电影院的名字）
    let cinemaDetaHeaderView1 = cinemaDetaHeaderView({
      list
    })
    $('header').html(cinemaDetaHeaderView1)
    //初始化页面渲染
    let movelist = imgleng[0]
    let cinemaDetaHeaderMViews = cinemaDetaMovdeView({
      movelist
    })
    $("main .movdes").html(cinemaDetaHeaderMViews)
    //初始页面渲染
    $('footer').css('display', 'none')
    //进入页面初始展示的当天的场次
    let show = movelist.shows[0].plist
    let cinemaDetaSessionView1 = cinemaDetaSessionView({
      show
    })
    $("main .session").html(cinemaDetaSessionView1)
    $('main .times').eq(0).addClass('active');
    $('main .times').on('tap', function () {
      $('.times').removeClass("active");
      $(this).addClass('active');
    })
    $('main .times').on('tap', function () {
      let This = $(this).index();
      $('.times').removeClass("active");
      $(this).addClass('active');
      console.log(This);
      let show = movelist.shows[This].plist
      console.log(movelist);
      
      let cinemaDetaSessionView1 = cinemaDetaSessionView({
        show
      })
      $("main .session").html(cinemaDetaSessionView1)
    })
    //电影轮播
    let swiper = new Swiper('.swiper-container', {
      slidesPerView: 5,
      spaceBetween: 0,
      centeredSlides: true,
      preventClicks: false,
      slideToClickedSlide: true,
      on: {
        slideChangeTransitionEnd: function () {
          // 获取当前索引，根据索引渲染电影信息
          let movelist = imgleng[this.activeIndex]
          let bigimg = 'url(' + list.showData.movies[this.activeIndex].img.replace(/w\.h/, '128.180') + ')';
          $('main .box').css('background', bigimg)
          let cinemaDetaHeaderMViews = cinemaDetaMovdeView({
            movelist
          })
          $("main .movdes").html(cinemaDetaHeaderMViews)
          $('main .times').eq(0).addClass('active');
          let show = movelist.shows[0].plist
          let cinemaDetaSessionView1 = cinemaDetaSessionView({
            show
          })
          $("main .session").html(cinemaDetaSessionView1)
          let swiper1 = new Swiper('.swiper-container1', {
            slidesPerView: 3,
          })
          //点击日期 渲染场次
          $('main .times').on('tap', function () {
            let This = $(this).index();
            $('.times').removeClass("active");
            $(this).addClass('active');
            // console.log(This);
            console.log(movelist);
            
            let show = movelist.shows[This].plist
            let cinemaDetaSessionView1 = cinemaDetaSessionView({
              show
            })
            $("main .session").html(cinemaDetaSessionView1)
          })
        },
      },
    });
    //返回


    $('header .fh').on('tap', function () {
      location.hash = `cinemaPosition`
    })
  }
}
export default new CinemaDetail()