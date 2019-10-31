const positionView = require('../views/position.art')
const positionListView = require('../views/position-list.art')
const movieHeaderView = require('../views/positionHeader.art')
const postionModel = require('../models/postion')
const postionMoreModel = require('../models/morePostion')
const BScroll = require('better-scroll')
class PositionH {
  constructor() {
    // this.render(indexController-);
    this.key = 1; //全局ajax返回值 key 
    this.j = 0; //下拉切割的下标
  }
  renderer(list) {
    let positionListHtml = positionListView({
      list
    });
    
    $('main ul').html(positionListHtml);
    $('main ul li').on('tap', function () {
      let id = $(this).attr('data-id')
      location.hash = `deatil/${id}`
    })
  }
  
  async render() {
    //渲染header
    //判断是不是有header
    if ($('.dzName').length==0){
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
    }
    
  $('.hot-show').addClass('active')
  
    var that = this;
    let result = await postionModel.get();
    let arr = result.movieIds;
    let a = [];
    let b = [];
    for (let i = 0; i < arr.length; i += 12) {
      a.push(arr.slice(i, i + 12));
    } //把数据分为没12个一组
    for (let i = 0; i < a.length; i++) {
      b.push(a[i].join('%2C'));
    } //每个元素加上%2c
    // console.log(b[1]);
    //let arr=result            
    let list = this.list = result.movieList;
    let positionHtml = positionView({});
    let $main = $('main');
    $main.html(positionHtml);
    
    // console.log(list);
    
    that.renderer(list);
    //热映和即将上映
    //正在热映
    // $(".select li").on('tap', function () {
    //   $(".select li").removeClass('active')
    //   $(this).addClass('active')

    //   if ($('.hot-show').hasClass('active')) {
    //     that.renderer(list);
    //     console.log(11);
        
    //   } else if ($('.about-show').hasClass('active')) {
    //     that.renderer1();
    //     console.log(22);
    //   }
    // })





    // 定义图片对象，上拉下滑
    let $imgHead = $('.head img');
    let $imgFoot = $('.foot img');
    // bScroll 是BetterScroll实例，将来可以用来调用API
    let bScroll = new BScroll.default($main.get(0), {
      probeType: 2
    })
    // 开始要隐藏下拉刷新的div
    bScroll.scrollBy(0, -40);
    bScroll.on('scrollEnd', async function () {
      if (this.y >= 0) {
        $imgHead.attr('src', '/assets/images/ajax-loader.gif');
        let result = await postionModel.get();
        let list = result.movieList;
        that.renderer(list);
        bScroll.scrollBy(0, -40);
        $imgHead.attr('src', '/assets/images/arrow.png');
        $imgHead.removeClass('up');
        $('main ul li').on('tap', function () {
          let id = $(this).attr('data-id')

          location.hash = `deatil/${id}`
        })
        $("header .dz").on('tap', function () {
          location.hash = `city`
        })
     
        //   if ($('.hot-show').hasClass('active')) {
        //     that.renderer(list);
        //     console.log(11);
            
        //   } else if ($('.about-show').hasClass('active')) {
        //     that.renderer1();
        //     console.log(22);
        //   }
        
      }
      //下拉加载
      if (this.maxScrollY >= this.y) {
        that.j++;
        $imgFoot.attr('src', '/assets/images/ajax-loader.gif');
        let result = await postionMoreModel.get({
          key: b[that.j]
        })
        let list = result.coming;
        //拼接 已有的+加载的
        that.list = [...that.list, ...list];
        that.renderer(that.list);
        bScroll.scrollBy(0, 40);
        $imgFoot.attr('src', '/assets/images/arrow.png');
        $imgFoot.removeClass('down');
        //点击进入详情页面
        $('main ul li').on('tap', function () {
          let id = $(this).attr('data-id')
          location.hash = `deatil/${id}`
        })
        $("header .dz").on('tap', function () {
          location.hash = `city`
        })
      
    
        //   if ($('.hot-show').hasClass('active')) {
        //     that.renderer(list);
        //     console.log(11);
            
        //   } else if ($('.about-show').hasClass('active')) {
        //     that.renderer1();
        //     console.log(22);
        //   }
      
      }
    })


    bScroll.on('ki', function () {
      if (this.y > 0) {
        $imgHead.addClass('up');
      }
    })
  }
}
export default new PositionH();