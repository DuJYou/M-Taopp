import postionhotControllers from '../controllers/position-hot'
import positionView  from '../views/position.art'
import positionAboutView  from '../views/position-about.art'
import movieHeaderView  from '../views/positionHeader.art'
import postionAboutModel  from '../models/positionAbout'
import postionAboutMoreModel  from '../models/positionAboutMore'
import BScroll  from 'better-scroll'
class PositionA {
    constructor() {
        this.key = 1; //全局ajax返回值 key 
        this.j = 0; //下拉切割的下标
    }
    renderer(timeArr) {
        let positionAboutHtml = positionAboutView({
            timeArr
        });
        $('main ul').html(positionAboutHtml);
        //点击渲染详情页面
        $('main ul li').on('tap', function () {
            let id = $(this).attr('data-Mid')
            location.hash = `movie/${id}`
        })
    }
    async render() {
        // console.log($('header').html() );
        //判断是不是有header
        if ($('.dzName').length == 0) {
            let movieHeaderHtml = movieHeaderView({});
            $('header').html(movieHeaderHtml);
            //当前城市
            let dzname = localStorage.cityname
            if (!dzname) {
                $('.dzName').html('北京')
            } else {
                $('.dzName').html(dzname)
            }
            //城市选择
            $("header .dz").on('tap', function () {
                location.hash = `city`
            })
            //页尾
            $('footer').css('display', 'block')
            $('.about-show').addClass('active')
        }
        $('.about-show').addClass('active')
        $(".select li").on('tap', function () {
            $(".select li").removeClass('active')
            $(this).addClass('active')
        })
        $(".hot-show").on('tap', function () {
            location.hash = `position`
            postionhotControllers.render()
        })
        let that = this;
        let result = await postionAboutModel.get();
        //获取电影的id
        let arr = result.movieIds;
        let a = [];
        let b = [];
        //把数据分为没12个一组
        for (let i = 0; i < arr.length; i += 12) {
            a.push(arr.slice(i, i + 12));
        }
        //每个元素加上%2c
        for (let i = 0; i < a.length; i++) {
            b.push(a[i].join('%2C'));
        }
        // let list = this.list = result.coming;
        let positionHtml = positionView();
        $('main').html(positionHtml);
        //时间
        let timelist = this.timelist = result.coming;
        let arr2 = {};
        for (let i = 0; i < timelist.length; i++) {
            if (!arr2[timelist[i].comingTitle]) {
                arr2[timelist[i].comingTitle] = [];
            }
            arr2[timelist[i].comingTitle].push(timelist[i])
        }
        let timeArr = Object.entries(arr2);
        // console.log(timeArr);
        // console.log(timelist);
        this.renderer(timeArr)




        // 定义图片对象，上拉下滑
        let $imgHead = $('.head img');
        let $imgFoot = $('.foot img');
        // bScroll 是BetterScroll实例，将来可以用来调用API
        let bScroll = new BScroll($('main').get(0),{
            probeType: 2
          })
        // 开始要隐藏下拉刷新的div
        bScroll.scrollBy(0, -40);
        bScroll.on('scrollEnd', async function () {
            if (this.y >= 0) {
                $imgHead.attr('src', '/assets/images/ajax-loader.gif');
                let result = await postionAboutModel.get();
                let timelist = this.timelist = result.coming;
                // console.log(timelist);
                
                let arr2 = {};
                for (let i = 0; i < timelist.length; i++) {
                    if (!arr2[timelist[i].comingTitle]) {
                        arr2[timelist[i].comingTitle] = [];
                    }
                    arr2[timelist[i].comingTitle].push(timelist[i])
                }
                let timeArr = Object.entries(arr2);
                // console.log(timeArr);
                that.renderer(timeArr)

                bScroll.scrollBy(0, -40);
                $imgHead.attr('src', '/assets/images/arrow.png');
                $imgHead.removeClass('up');
                $('main ul li').on('tap', function () {
                    let id = $(this).attr('data-Mid')
                    location.hash = `movie/${id}`
                })
                $("header .dz").on('tap', function () {
                    location.hash = `city`
                })

            }
            //下拉加载
            if (this.maxScrollY >= this.y) {
                that.j++;
                $imgFoot.attr('src', '/assets/images/ajax-loader.gif');
                let result = await postionAboutMoreModel.get({
                    key: b[that.j]
                })
                let timelist = result.coming;
                that.timelist = [...that.timelist, ...timelist];
                let arr2 = {};
                for (let i = 0; i < that.timelist.length; i++) {
                    if (!arr2[that.timelist[i].comingTitle]) {
                        arr2[that.timelist[i].comingTitle] = [];
                    }
                    arr2[that.timelist[i].comingTitle].push(that.timelist[i])
                }
                let timeArr = Object.entries(arr2);
                that.renderer(timeArr);
                //拼接 已有的+加载的
                bScroll.scrollBy(0, 40);
                $imgFoot.attr('src', '/assets/images/arrow.png');
                $imgFoot.removeClass('down');
                //点击进入详情页面
                $('main ul li').on('tap', function () {
                    let id = $(this).attr('data-Mid')
                    location.hash = `movie/${id}`
                })
                $("header .dz").on('tap', function () {
                    location.hash = `city`
                })
            }
        })
        bScroll.on('ki', function () {
            if (this.y > 0) {
                $imgHead.addClass('up');
            }
        })
    }
}
export default new PositionA();