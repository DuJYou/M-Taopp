const detailView = require('../views/detail.art')
const detailheaderlView = require('../views/detailHeader.art')
const detailModetail = require('../models/detail')
class Detail {
    constructor() {
        
    }
    async render() {
        

        let hash = location.hash.substr(1)
        let reg = new RegExp('^(\\w+)(\\/)(\\w+)', 'g')
        let path = reg.exec(hash)
        let a = path[3];
        // console.log(a);
        
        let result = await detailModetail.get({
            id: a
        })
        let list = result.detailMovie
        // console.log(list);
        let hear = detailheaderlView({list})
        $('header').html(hear)
        $('footer').css('display','none')
        let html = detailView({
            list
        })
        $('main').html(html)

        $('.next-detail').on('tap', function() {
            location.hash = `datalmovie/${a}`
          })
        $('.fh').on('tap', function() {
            location.hash = `position`
          })
        $('.showDay').on('tap', function() {
            $(this).addClass('active').siblings().removeClass('active')
          })


    }



}

export default new Detail()