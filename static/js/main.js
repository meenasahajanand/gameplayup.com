// import {eq} from "lodash";

$(document).ready(function() {
    if ( $("img.lazy").length) {
      new LazyLoad({})
     };
});
// fastclick
window.addEventListener('load', function() {
    new FastClick(document.body);
}, false);

$('#searchB').focus(function (){
    $('.searchBtn').addClass('act')
})
var searchB = document.getElementById('searchB')
document.addEventListener("click",function (e){
    if($('#searchB').parent().hasClass("act") && !e.composedPath().includes(searchB)){
        $('#searchB').parent().removeClass('act')
    }
});

document.addEventListener("click",function (e){
    if (e.target.className == 'history' ||e.target.className == 'hisImg'||e.target.className == ' hisImg lazy '){
        $('.historyMask').addClass('act')
    } else if( $('.historyMask').hasClass('act') && e.target.className !== 'historyMask'){
        $('.historyMask').removeClass('act')
    }
});

$('.cateBtn').click(function () {
    $('.categoryBox').addClass('act');
    $('body').addClass('act');

})

$('.categoryBox').click(function (e) {
    if (e.target===e.currentTarget||e.target.className=='iconfont  icon-guanbi'){
        $('.categoryBox').removeClass('act');
        $('body').removeClass('act');
    }
})

function search() {
    var keyword = $('#searchB').val().trim();
    if (!keyword){
        layer.alert('Please enter search content')
        return false
    } else {
        window.location.href = '/searchret?keyword=' + keyword;
    }
}
// 键盘按键提交
$("#searchB").keydown(function (e) {
    if (e.keyCode == 13) {
        search();
    }
});
