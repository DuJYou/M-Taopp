const cityView = require('../views/city.art')
const cityModel = require('../models/city')
class City {
    constructor() {
    }
    async render() {
        let result = await cityModel.get();
        let list = result.cts
        let cityHtml = cityView({
            list
        })
        $('#root').html(cityHtml);
        function initials() { //公众号排序
            let SortList = $(".sort_list");
            let SortBox = $(".sort_box");
            SortList.sort(asc_sort).appendTo('.sort_box'); //按首字母排序
            function asc_sort(a, b) {
                return makePy($(b).find('.num_name').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name').text().charAt(0))[0].toUpperCase() ? 1 : -1;
            }
            let initials=[];
            let num=0;
            SortList.each(function (i) {
                let initial = makePy($(this).find('.num_name').text().charAt(0))[0].toUpperCase();
                if (initial >= 'A' && initial <= 'Z') {
                    if (initials.indexOf(initial) === -1)
                        initials.push(initial);
                } else {
                    num++;
                }
            });
            $.each(initials, function (index, value) { //添加首字母标签
                SortBox.append('<div class="sort_letter" name="' + value + '" id="' + value + '">' + value + '</div>');
            });
            if (num != 0) {
                SortBox.append('<div class="sort_letter" id="default">#</div>');
            }
            for (let i = 0; i < SortList.length; i++) { //插入到对应的首字母后面
                let letter = makePy(SortList.eq(i).find('.num_name').text().charAt(0))[0].toUpperCase();
                switch (letter) {
                    case "A":
                        $('#A').after(SortList.eq(i));
                        break;
                    case "B":
                        $('#B').after(SortList.eq(i));
                        break;
                    case "C":
                        $('#C').after(SortList.eq(i));
                        break;
                    case "D":
                        $('#D').after(SortList.eq(i));
                        break;
                    case "E":
                        $('#E').after(SortList.eq(i));
                        break;
                    case "F":
                        $('#F').after(SortList.eq(i));
                        break;
                    case "G":
                        $('#G').after(SortList.eq(i));
                        break;
                    case "H":
                        $('#H').after(SortList.eq(i));
                        break;
                    case "I":
                        $('#I').after(SortList.eq(i));
                        break;
                    case "J":
                        $('#J').after(SortList.eq(i));
                        break;
                    case "K":
                        $('#K').after(SortList.eq(i));
                        break;
                    case "L":
                        $('#L').after(SortList.eq(i));
                        break;
                    case "M":
                        $('#M').after(SortList.eq(i));
                        break;
                    case "N":
                        $('#N').after(SortList.eq(i));
                        break;
                    case "O":
                        $('#O').after(SortList.eq(i));
                        break;
                    case "P":
                        $('#P').after(SortList.eq(i));
                        break;
                    case "Q":
                        $('#Q').after(SortList.eq(i));
                        break;
                    case "R":
                        $('#R').after(SortList.eq(i));
                        break;
                    case "S":
                        $('#S').after(SortList.eq(i));
                        break;
                    case "T":
                        $('#T').after(SortList.eq(i));
                        break;
                    case "U":
                        $('#U').after(SortList.eq(i));
                        break;
                    case "V":
                        $('#V').after(SortList.eq(i));
                        break;
                    case "W":
                        $('#W').after(SortList.eq(i));
                        break;
                    case "X":
                        $('#X').after(SortList.eq(i));
                        break;
                    case "Y":
                        $('#Y').after(SortList.eq(i));
                        break;
                    case "Z":
                        $('#Z').after(SortList.eq(i));
                        break;
                    default:
                        $('#default').after(SortList.eq(i));
                        break;
                }
            };
        }
        //外部
        $(function () {
            let Initials = $('.initials');
            let LetterBox = $('#letter');
            Initials.find('ul').append('<li><a href="#A">A</a></li><li><a href="#B">B</a></li><li><a href="#C">C</a></li><li><a href="#D">D</a></li><li><a href="#E">E</a></li><li><a href="#F">F</a></li><li><a href="#G">G</a></li><li><a href="#H">H</a></li><li><a href="#I">I</a></li><li><a href="#J">J</a></li><li><a href="#K">K</a></li><li><a href="#L">L</a></li><li><a href="#M">M</a></li><li><a href="#N">N</a></li><li><a href="#O">O</a></li><li><a href="#P">P</a></li><li><a href="#Q">Q</a></li><li><a href="#R">R</a></li><li><a href="#S">S</a></li><li><a href="#T">T</a></li><li><a href="#U">U</a></li><li><a href="#V">V</a></li><li><a href="#W">W</a></li><li><a href="#X">X</a></li><li><a href="#Y">Y</a></li><li><a href="#Z">Z</a></li><li><a href="##">#</a></li>');
            initials();
            $(".initials ul li").on('tap', function () {
                let _this = $(this);
                let LetterHtml = _this.html();
                LetterBox.html(LetterHtml).fadeIn();
                Initials.css('background', 'rgba(145,145,145,0.6)');
                setTimeout(function () {
                    Initials.css('background', 'rgba(145,145,145,0)');
                    LetterBox.fadeOut();
                }, 1000);
                let _index = _this.index()
                if (_index == 0) {
                    $('html,body').animate({
                        scrollTop: '0rem'
                    }, 300); //点击第一个滚到顶部
                } else if (_index == 27) {
                    let DefaultTop = $('#default').position().top;
                    $('html,body').animate({
                        scrollTop: DefaultTop + 'rem'
                    }, 300); //点击最后一个滚到#号
                } else {
                    let letter = _this.text();
                    if ($('#' + letter).length > 0) {
                        let LetterTop = $('#' + letter).position().top;
                        $('html,body').animate({
                            scrollTop: LetterTop - .45 + 'rem'
                        }, 300);
                    }
                }
            })
            let windowHeight = $(window).height();
            let InitHeight = windowHeight - 45;
            Initials.height(InitHeight);
            let LiHeight = InitHeight / 28;
            Initials.find('li').height(LiHeight);
        })
        // floor(){
        //     let lis = $('.nav-item')
        //     let divs = $('.cityPos')
        //     for(var i=0;i<lis.length;i++){
        //         lis[i].index = i;
        //         lis[i].onclick = function(){
        //             for(var i=0;i<lis.length;i++){
        //                 lis[i].className = '';
        //             }
        //             this.className = 'active';
        //             setScroll( this.index );
        //         };
        //     }
        
        //     $('.citiesChoose').on('scroll', function(){
        //         //console.log($('.citiesChoose'));
        
        //         var scroll = $('.citiesChoose').scrollTop();
        
        //         for(var i=0;i<divs.length;i++){
        
        //             if( i === divs.length - 1){
        //                 if( divs[i].offsetTop < scroll + 100 ){
        //                     for(var j=0;j<lis.length;j++){
        //                         lis[j].className = '';
        //                     }
        //                     lis[i].className = 'active';
        //                 }
        //                 break;
        //             }
        
        
        //             if( divs[i].offsetTop < scroll + 100 && divs[i+1].offsetTop > scroll + 100 ){
                        
        //                 for(var j=0;j<lis.length;j++){
        //                     lis[j].className = '';
        //                 }
        //                 lis[i].className = 'active';
        //             }
        //         }
        
        //     })
        
        //     function setScroll( index ){
        //         $('.citiesChoose').scrollTop (divs[index].offsetTop) ;
        //         console.log($('.citiesChoose').scrollTop());
                
        //     }
        // }
        $('.sort_list').on('tap', function () {
            //存城市名字
            let cityname = $(this).find('.num_name').html()
            localStorage.cityname = cityname
            //存城市id
            let cityid = $(this).find('.num_name').attr('data-cityID')
            localStorage.cityid = cityid
            location.hash = `position`
        })
        $('.city-item').on('tap', function () {
            //存城市名字
            let cityname = $(this).html()
            localStorage.cityname = cityname
            //存城市id
            let cityid = $(this).attr('data-cityID')
            localStorage.cityid = cityid
            location.hash = `position`
        })
    }
}
export default new City();