const myView= require('../views/my.art')
const myhView= require('../views/myh.art')


class My{
    constructor(){
        // this.render();
    }
    render(){
        let myhViewHtml = myhView()
        $('header').html(myhViewHtml)
        let myViewHtml = myView()
        $('main').html(myViewHtml)
        // $('header').html()
    }
}

export default new My();