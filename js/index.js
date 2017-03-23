window.onload = function () {
    search();
    banner();
    downTime();
};
//搜索框特效
function search(){
    var top = document.querySelector(".top");
    var banner = document.querySelector(".banner")
    var bannerHeight = banner.offsetHeight;

    window.onscroll= function () {
        var scrolltop = document.body.scrollTop;
        var opacity = 0;
        if(scrolltop<bannerHeight){
            opacity = 0.845*scrolltop/bannerHeight;
        }else{
            opacity = 0.845;
        }
        top.style.background= "rgba(201,21,35,"+opacity+")";
    }
}
//轮播图特效
function banner(){
    var banner = document.querySelector(".banner");
    var imgbox = banner.querySelector("ul");
    var ol = banner.querySelector("ol");
    var points = ol.querySelectorAll("li");
    var bannerWidth = banner.offsetWidth;
    var addTransiton = function(){
        imgbox.style.webkitTransition = "all 0.3s linear";
        imgbox.style.transition = "all 0.3s linear";
    }
    var clearTransiton = function(){
        imgbox.style.webkitTransition = "none";
        imgbox.style.transition = "none";
    }
    var setTranslateX = function(x){
        imgbox.style.webkitTransform = "translateX("+x+"px)";
        imgbox.style.Transform = "translateX("+x+"px)";
    }
    var index = 1;//设置初始索引为1
    var timerId = setInterval(function () {
        index++;
        //添加过渡效果
        addTransiton();
        //定位
        setTranslateX(-index*bannerWidth);
    },2500);
    myjd.transitionEnd(imgbox, function () {
        if(index >= 5){
            index = 1;
            clearTransiton();
            setTranslateX(-index*bannerWidth);
        }else if(index == 0){
            index = 4;
            clearTransiton();
            setTranslateX(-index*bannerWidth);
        }
        setPoint();
    });
   
    var setPoint = function () {
    //    清除圆点的显示
        for(var i = 0 ; i < points.length ; i ++){
            points[i].classList.remove("active");
        }
    //    添加当前圆点样式
        points[index-1].classList.add("active");
    }
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var isMove = false;
    banner.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
        clearInterval(timerId);
    });
    banner.addEventListener("touchmove", function (e) {
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        clearTransiton();
        setTranslateX(-index*bannerWidth+distanceX);
        isMove = true;
    });
    //添加触摸结束事件
    window.addEventListener("touchend", function () {
        if(Math.abs(distanceX) > bannerWidth/3 && isMove){
            if(distanceX>0){
            }else{
                index++;
            }
            addTransiton();
            setTranslateX(-index*bannerWidth);
        }else{
            addTransiton();
            setTranslateX(-index*bannerWidth);
        }
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;
        clearInterval(timerId); 
        timerId = setInterval(function () {
            index++;
            addTransiton();
            setTranslateX(-index*bannerWidth);
        },2500);
    });
}
//倒计时特效
function downTime(){
    var timebox = document.querySelector(".product_title > .time");
    var spans = timebox.querySelectorAll("span");
    var time = 1*50*60;
    
    var timerId = setInterval(function () {
        time--;
        if(time<0) return false;
        var h = parseInt(time/3600);
        var m = parseInt(time%3600/60);
        var s = time%60;

        spans[0].innerHTML = parseInt(h/10);
        spans[1].innerHTML = h%10;
        spans[3].innerHTML = parseInt(m/10);
        spans[4].innerHTML = m%10;
        spans[6].innerHTML = parseInt(s/10);
        spans[7].innerHTML = s%10;
    },1000)
}
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
