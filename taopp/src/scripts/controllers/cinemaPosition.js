const concretenessCity1view = require('../views/concretenessCity2.art')
const concretenessCityview = require('../views/concretenessCity.art')
const characteristicview = require('../views/characteristic.art')
const cinemaHearView = require('../views/cinemaHeader.art')
const cinemaView = require('../views/cinemaPosition.art')
const cinemaListview = require('../views/cinemaList.art')
const allCityview = require('../views/allCity.art')
const brandview = require('../views/brand.art')
const CCBCModel = require('../models/cinema-city-brand-chara')
const cinemalistModel = require('../models/moreCinema')
const cinemaModel = require('../models/cinema')
const BScroll = require('better-scroll');
const layout = require("./index");
class Cinema {
    constructor() {
        this.key = 0;
        this.j = 0;
    }
    renderer(list) {
        let cinemaListHtml = cinemaListview({
            list
        });
        $('main ul').html(cinemaListHtml);
        let $mianHeight = $('main').height()
        if ($('.cinmaUl').height() < $('main').height()) {
            $('.cinmaUl').height($mianHeight)
        } else {
            $('.cinmaUl').height(100 + '%')
        }
    }
    async render() {
        window.districtId = -1; //district
        window.areaId = -1; //area
        window.brandId = -1; //brandId
        window.hallTypeId = -1; //hallType
        window.serviceId = -1; //serviceId
        window.stationId = -1; //stationId
        window.lineId = -1; //stationId
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
        //城市ID
        let cityid = localStorage.cityid
        if (localStorage.cityid) {} else {
            cityid = 1;
        }

        let result = await cinemaModel.get({
            data: newDate,
            cityId: cityid,
            district: window.districtId,
            area: window.areaId,
            brandId: window.brandId,
            hallType: window.hallTypeId,
            serviceId: window.serviceId,
            stationId: window.stationId,
            lineId:window.lineId
        });
        let list = this.list = result.cinemas;
        // console.log(list);

        let a = [];
        for (let i = 0; i < 1000; i += 20) {
            a.push(i);
        }
        let html = cinemaView({})
        $('main').html(html)
        this.renderer(list);
        //进入电影院详情
        $('main li').on('tap', function () {
            let id = $(this).attr('data-id')
            location.hash = `cinemaDetail/${id}`
        })
        //点击城市的时候渲染城市选择页面
        $("header .activeCity").on('tap', function () {
            location.hash = `city`
        })
        //全城
        $('.allCityFont').on('tap', function () {
            
            $('.selector-mod').css('display', 'block')
            if ($(this).hasClass('active')) {
                $(this).removeClass('active')
            } else {
                $(this).addClass('active').siblings().removeClass('active')
            }
            if ($('.allcity').css('display') === 'none') {
                $('.allcity').css('display', 'block')
            } else {
                $('.allcity').css('display', 'none')
            }
            $('.characteristic-cont').css('display', 'none')
            $('.allbrand').css('display', 'none')
        })
        let ccbc = await CCBCModel.get()
        let cityL = ccbc.district.subItems
        let subway = ccbc.subway.subItems
        let allCityHtml = allCityview({
            cityL,
            subway
        })
        let region = 0;
        let region1 = 0;
        let concretenessCityhtml = 0
        let concretenessCity1html = 0
        $('.allcity').html(allCityHtml)
        $('.switcher-item1').on('tap', function () {
            $(this).addClass('active').siblings().removeClass('active')
            $('.mall').css('display', 'block')
            $('.well').css('display', 'none')
        })
        $('.switcher-item2').on('tap', function () {
            $(this).addClass('active').siblings().removeClass('active')
            $('.mall').css('display', 'none')
            $('.well').css('display', 'block')
        })
        //商圈
        $('.filter-item-sq').on('tap', function () {
            $(this).addClass('active').siblings().removeClass('active')
            region = ccbc.district.subItems[$(this).index()].subItems
            concretenessCityhtml = concretenessCityview({
                region
            })
            $('.option-list-inner1').html(concretenessCityhtml)
            window.districtId = $(this).attr('district-id')
            if(window.districtId==-1 ){
                window.areaId = -1; //area
                window.brandId = -1; //brandId
                window.hallTypeId = -1; //hallType
                window.serviceId = -1; //serviceId
                window.stationId = -1; //stationId
                window.lineId = -1;
            }
            // console.log(window.stationId);
            //具体商圈
            $('.filter-item1').on('tap', function () {
                $(this).addClass('active').siblings().removeClass('active')
                window.areaId = $(this).attr('data-areaId')
                let result = cinemaModel.get({
                    data: newDate,
                    cityId: cityid,
                    district: window.districtId,
                    area: window.areaId,
                    brandId: window.brandId,
                    hallType: window.hallTypeId,
                    serviceId: window.serviceId,
                    stationId: window.stationId,
                    lineId:window.lineId
                });
                let list = this.list = result.cinemas;
                that.renderer(list);
            })
        })

        //地铁
        $('.filter-item-dt').on('tap', function () {
            $(this).addClass('active').siblings().removeClass('active')
            region1 = ccbc.subway.subItems[$(this).index()].subItems
            concretenessCity1html = concretenessCity1view({
                region1
            })
            $('.option-list-inner2').html(concretenessCity1html)
            window.lineId = $(this).attr('data-subwayid') //地铁
            // console.log(window.lineId);
            $('.filter-item2-dt').on('tap', function () {
                $(this).addClass('active').siblings().removeClass('active')
                window.stationId = $(this).attr('data-stationId')
                // console.log(window.stationId);
                let result = cinemaModel.get({
                    data: newDate,
                    cityId: cityid,
                    district: window.districtId,
                    area: window.areaId,
                    brandId: window.brandId,
                    hallType: window.hallTypeId,
                    serviceId: window.serviceId,
                    stationId: window.stationId,
                    lineId:window.lineId
                });
                let list = this.list = result.cinemas;
                that.renderer(list);

            })
        })
        //综合排序
        $('.brands').on('tap', function () {
            $('.selector-mod1').css('display', 'block')
            if (!$(this).hasClass('active')) {
                $(this).addClass('active').siblings().removeClass('active')
            } else {
                $(this).removeClass('active')
            }
            if ($('.allbrand').css('display') == 'block') {
                $('.allbrand').css('display', 'none')
            } else {
                $('.allbrand').css('display', 'block')
            }
            $('.allcity').css('display', 'none')
            $('.characteristic-cont').css('display', 'none')
        })
        let brandL = ccbc.brand.subItems
        let brandHtml = brandview({
            brandL
        })
        $('.allbrand').html(brandHtml)
        $('.CL').on('tap', function () {
            $(this).addClass('active').siblings().removeClass('active')
            window.brandId = $(this).attr('data-brandid');
            let result = cinemaModel.get({
                data: newDate,
                cityId: cityid,
                district: window.districtId,
                area: window.areaId,
                brandId: window.brandId,
                hallType: window.hallTypeId,
                serviceId: window.serviceId,
                stationId: window.stationId,
                lineId:window.lineId
            });
            let list = this.list = result.cinemas;
            that.renderer(list);
        })
        //特色
        $('.characteristic').on('tap', function () {
            $('.selector-mod2').css('display', 'block')
            if (!$(this).hasClass('active')) {
                $(this).addClass('active').siblings().removeClass('active')
            } else {
                $(this).removeClass('active')
            }
            if ($('.characteristic-cont').css('display') == 'block') {
                $('.characteristic-cont').css('display', 'none')
            } else {
                $('.characteristic-cont').css('display', 'block')
            }
            $('.allcity').css('display', 'none')
            $('.allbrand').css('display', 'none')
            //选取条件
            $('.specialContentLi').on('tap', function () {
                $(this).addClass('active').siblings().removeClass('active')
                window.serviceId = $(this).attr('data-serviceid')
                // console.log(window.serviceId);
            })
            $('.tingContent').on('tap', function () {
                $(this).addClass('active').siblings().removeClass('active')
                window.hallType = $(this).attr('data-hallTypeid')
                // console.log(window.hallType);
            })
            //重置归零
            $('.clickspecialChong').on('tap', function () {
                $(this).addClass('active').siblings().removeClass('active')
                $(this).parent().siblings().children().removeClass('active')
                window.hallType = -1
                window.serviceId = -1
            })
            //点击确定
            $('.clickspecialQue').on('tap', function () {
                $(this).addClass('active').siblings().removeClass('active')
                let result = cinemaModel.get({
                    data: newDate,
                    cityId: cityid,
                    district: window.districtId,
                    area: window.areaId,
                    brandId: window.brandId,
                    hallType: window.hallTypeId,
                    serviceId: window.serviceId,
                    stationId: window.stationId,
                    lineId:window.lineId
                });
                let list = this.list = result.cinemas;
                that.renderer(list);
                $('.characteristic-cont').css('display', 'none')
            })
        })
        let hallType = ccbc.hallType.subItems
        let service = ccbc.service.subItems
        // console.log(hallType);
        let characteristiHtml = characteristicview({
            hallType,
            service
        })
        $('.characteristic-cont').html(characteristiHtml)
        //显示页尾
        $('footer').css('display', 'block')
        //判断当页面内容高度小于main的高度时 页面高度=main高度+40（上拉下拉）
        let mh = $('main').height();
        if ($('.list-container ul').height() <= mh) {
            $('.list-container ul').height(mh + 40);
        }
        //点击渲染查询页面
        $('.search').on('tap', function () {
            location.hash = `cinemaSearch`
        })

        let $imgHead = $('.head img');
        let $imgFoot = $('.foot img');
        // bScroll 是BetterScroll实例，将来可以用来调用API
        // console.log($('main').html());

        let bScroll = new BScroll.default($('main').get(0), {
            probeType: 2
        })
        // 开始要隐藏下拉刷新的div
        bScroll.scrollBy(0, -40);
        bScroll.on('scrollEnd', async function () {
            if (this.y >= 0) {
                $imgHead.attr('src', '/assets/images/ajax-loader.gif');
                let result = await cinemaModel.get({
                    data: newDate,
                    cityId: cityid,
                    district: window.districtId,
                    area: window.areaId,
                    brandId: window.brandId,
                    hallType: window.hallTypeId,
                    serviceId: window.serviceId,
                    stationId: window.stationId,
                    lineId:window.lineId
                });
                let list = result.cinemas;
                // console.log(list);
                
                that.renderer(list);
                bScroll.scrollBy(0, -40);
                $imgHead.attr('src', '/assets/images/arrow.png');
                $imgHead.removeClass('up');
                $('main li').on('tap', function () {
                    let id = $(this).attr('data-id')
                    location.hash = `cinemaDetail/${id}`
                })
                $("header .activeCity").on('tap', function () {
                    location.hash = `city`
                })
                let mh = $('main').height();
                if ($('.list-container ul').height() <= mh) {
                    $('.list-container ul').height(mh + 40);
                }
            }
            //下拉
            if (this.maxScrollY >= this.y) {
                that.j++;
                $imgFoot.attr('src', '/assets/images/ajax-loader.gif');
                let result = await cinemalistModel.get({
                    key: a[that.j],
                    data: newDate,
                    cityId: cityid,
                    district: window.districtId,
                    area: window.areaId,
                    brandId: window.brandId,
                    hallType: window.hallTypeId,
                    serviceId: window.serviceId,
                    stationId: window.stationId,
                    lineId:window.lineId,
                })
                let list = result.cinemas;
                // console.log(result);
                that.list = [...that.list, ...list];
                that.renderer(that.list);
                bScroll.scrollBy(0, 40);
                $imgFoot.attr('src', '/assets/images/arrow.png');
                $imgFoot.removeClass('down');
                $('main li').on('tap', function () {
                    let id = $(this).attr('data-id')
                    location.hash = `cinemaDetail/${id}`
                })
                $("header .activeCity").on('tap', function () {
                    location.hash = `city`
                })

                let mh = $('main').height();
                if ($('.list-container ul').height() <= mh) {
                    $('.list-container ul').height(mh + 40);
                }
            }
        })
        bScroll.on('scroll', function () {
            if (this.y > 0) {
                $imgHead.addClass('up');
            }
        })
    }
}
export default new Cinema()