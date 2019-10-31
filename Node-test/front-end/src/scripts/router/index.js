import SMERouter from 'sme-router'
import titleView from '../views/title.art'
import {index} from '../controllers/index'
import * as cinema from '../controllers/cinema'
import * as movie_hot from '../controllers/movie_hot'
const router = new SMERouter('indexMain')
router.use((req) => {
    //高亮
    let url = req.url.slice(1).split('?')[0].split('_')[0]
    $(`.sidebar-menu li[data-url=${url}]`).addClass('active').siblings().removeClass('active')
    //面包屑
    // let Breadcrumb = {
    //     'index': {
    //         level1: '管理系统',
    //         level2: '首页',
    //     },
    //     'cinema': {
    //         level1: '管理系统',
    //         level2: '影院管理',
    //     },
    //     'movie_hot':{
    //         level1: '管理系统',
    //         level2: '正在热映管理',
    //     }
    // }
    // let info = {
    //     Breadcrumb: {
    //         level1: Breadcrumb[url].level1,
    //         level2: Breadcrumb[url].level2
    //     },
    // }
    // let titleHtml=titleView({
    //     breadcrumb:info.Breadcrumb
    // })
    // $('#title').html(titleHtml)
})
router.route('/index', index)
router.route('/cinema', cinema.list)
router.route('/cinema_add', cinema.add)
router.route('/cinema_updata', cinema.updata)
router.route('/movie', movie_hot.list)
//初始
router.route('*', (req, res, next) => {
    res.redirect('/index', index)
})
export default router