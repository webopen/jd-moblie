window.myjd = {};
myjd.transitionEnd = function (dom,fn) {
    if(!dom||typeof dom != "object") return false;
    dom.addEventListener("transitionEnd", function () {
        fn && fn();
    });
    dom.addEventListener("webkitTransitionEnd",function(){
        fn && fn();
    });
};
//封装轻触屏幕的事件
myjd.tap = function (dom,callback) {
    if(!dom||typeof dom != "object") return false;
    var startTime = 0;
    var endTime =0 ;
    var distanceTime = 0
    var isMove = false;
    //添加事件监听者
    dom.addEventListener("touchstart", function (e) {
        startTime = Date.now();
    });
    dom.addEventListener("touchmove", function (e) {
        isMove = true;
    });
    dom.addEventListener("touchend", function (e) {
        endTime = Date.now();
        distanceTime = endTime - startTime;
        if(distanceTime < 150 && !isMove){
            callback && callback(e);
        }
        startTime = 0;
        endTime =0 ;
        distanceTime = 0
        isMove = false;
    });
};
