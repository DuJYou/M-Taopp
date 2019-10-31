const cinemaView = require('../views/cinemaPosition.art')
const cinemaHearView = require('../views/cinemaHeader.art')
const cinemaListview = require('../views/cinemaList.art')
const allCityview = require('../views/allCity.art')
const cinemaModel = require('../models/cinema')
const layout=require("./index");

class allcity {
    constructor() {
        // this.render();
        this.key = 0;
        this.j = 0;
    }

    async render() {
        //获取时间
        layout.default.render();
        let date = new Date;
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let newDate = `${year}-${month}-${day}`;
        //渲染页头
        let cinemaHeadHtml = cinemaHearView({});
        $('header').html(cinemaHeadHtml);
        // console.log(cinemaHeadHtml);
        let that = this;
        //判断是否选择城市 没有选择就默认北京
        let dzname = localStorage.cityname
        if (!dzname) {
            $('.activeCity').html("北京")
        } else {
            $('.activeCity').html(dzname)
        }
        //点击城市的时候渲染城市选择页面
        $("header .activeCity").on('tap', function () {
            location.hash = `city`
        })
        // $('.allCityFont').on('tap', function () {
        //     location.hash = `allCity`
        // })
        //显示页尾
        $('footer').css('display', 'block')
        //判断当页面内容高度小于main的高度时 页面高度=main高度+40（上拉下拉）
        let mh = $('main').height();
        if ($('.list-container ul').height() <= mh) {
            $('.list-container ul').height(mh + 40);
        }
        //点击渲染查询页面
        $('.search').on('tap', function () {
            $('.search').addClass('active')
            $('.selector-mod').css('display','block')
        })
        let allCityHtml =allCityview()
        $('main').html(allCityHtml)
     
    }
}
export default new allcity()