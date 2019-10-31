const cinemaSearchView = require('../views/cinemaSearch.art')
const searchResultView = require('../views/searchResult.art')
const cinemaModels = require('../models/cinemaSeach')
class CinemaSearch {
    constructor() {

    }
    render() {
        //渲染
        let CinemaSearchHtml = cinemaSearchView()
        $('#root').html(CinemaSearchHtml)
        // 搜索
        $('.ssk').on('input', async function () {
            //城市ID
            let cityid = localStorage.cityid
            if (localStorage.cityid) {} else {
                cityid = 1;
            }
            let a = this.value
            //获取数据
            let cinemalist = await cinemaModels.get({
                key: a,
                cityId: cityid
            })
            // 判断查询不存在
            let list = null;
            if (!cinemalist.cinemas) {
                list = []
            } else {
                list = cinemalist.cinemas.list
            }
            let searchResultViewHtml = searchResultView({
                list
            })
            $('.searchcont').html(searchResultViewHtml)
            //电影院详情
            $('.c_list').on('tap', function () {
                let id = $(this).attr('data-id')
                location.hash = `cinemaDetail/${id}`
            })
        })
        //取消
        $('.fcancle').on('tap', function () {
            location.hash = `cinemaPosition`
        })

    }
}
export default new CinemaSearch()