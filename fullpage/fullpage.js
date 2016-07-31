var $container = $('.container');
var $scroll = $container.find('.scrollContainer');
var height = $container.height();
$container.find('.slide').css('height', height + 'px');
$scroll.show();

// page控制器
var len = 3;
var current = 1;
var page = {
    isScrolling: false,
    next: function() {
        if((current + 1) <= len) {
            current += 1;
            page.move(current);
        }
    },
    pre: function() {
        if(current -1 > 0) {
            current -= 1;
            page.move(current);
        }
    },
    move: function(index) {
        page.isScrolling = true;
        var di = -(index-1)*height + 'px';
        //在ie下会闪屏
        //page.start = +new Date();
        // $scroll.css('transform', 'translateY('+di+')');
        // setTimeout(function(){
        //     page.isScrolling = false;
        // }, 1010);
        $scroll.css('top', di);
        setTimeout(function(){
            page.isScrolling = false;
        }, 800);
    }
};
// 滚动事件绑定
function bindMouseWheel (page) {
    var  type = ['mousewheel','DOMMouseScroll'];
    var  value = 0;
 
    function mouseWheelHandle (event) {
        if (page.isScrolling) {// 加锁部分
            return false;
        }
        var e = event.originalEvent || event;
        
        //e.originalEvent.wheelDelta => 120(up) or -120(down) 谷歌IE内核
        //e.originalEvent.deltaY => -100(up) or 100(down) 谷歌IE内核
        //e.originalEvent.detail => -3(up) or 3(down) 火狐内核
        value = e.deltaY  || e.detail;
        if (value > 0) {
            page.next();
        } else if (value < 0) {
            page.pre();
        }
    }
    //WebKit内核，Trident内核 => mousewheel
    //Gecko内核 => DOMMouseScroll
    $(document).on('mousewheel  DOMMouseScroll', mouseWheelHandle);

}

bindMouseWheel(page);