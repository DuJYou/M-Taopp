const movieHomeView = require('../views/detailmovieHome.art')
const movieHeaderView = require('../views/detailmovieheader.art')
const movieHomemodels = require('../models/movieHome')
class movieHome {
    constructor() {}

    async render() {

        let hash = location.hash.substr(1)
        let reg = new RegExp('^(\\w+)(\\/)(\\w+)', 'g')
        let path = reg.exec(hash)
        let a = path[3];
        // console.log(a);

        let result = await movieHomemodels.get({
            key: a
        })

        let list = result.detailMovie
        // console.log(list);


        let movieHomeHtml = movieHomeView({
            list
        });
        // console.log(list.nm);

        let movieHeaderhtml = movieHeaderView({
            list
        });
       
        
        $('header').html(movieHeaderhtml)
        $('main').html(movieHomeHtml)
        let co =list.backgroundColor;
        $('main .movhome').css('background',co)
        $('footer').css('display', 'none')
        let swiper3 = new Swiper('.swiper-container3', {
            loop: true,
            width: 140, 
            loopedSlides: 5,
        })

        $('header .dh').on('tap', function () {
            location.hash = `deatil/${a}`
        })
    }



}
export default new movieHome()