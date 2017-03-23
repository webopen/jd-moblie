window.onload = function(){
    leftSwiper();
    rightSwiper();
}

function leftSwiper(){
    var parentbox = document.querySelector(".listLeft");
    var childbox = parentbox.querySelector('ul');
    var lis = childbox.querySelectorAll("li");
    var parentHeight = parentbox.offsetHeight;
    var childHeight = childbox.offsetHeight;
    var maxPosition = 0;
    var minPosition = parentHeight - childHeight;
    var distance = 100;
    var maxSwiper = distance + maxPosition;
    var minSwiper = minPosition - distance;
    
    var addtransition = function () {
        childbox.style.webkitTransition = " all .3s";
        childbox.style.transition = " all .3s";
    }    
    var removetransition = function () {
        childbox.style.webkitTransition = "none";
        childbox.style.transition = "none";
    }    
    var setTranslateY = function (y) {
        childbox.style.webkitTransform = "translateY("+y+"px)";
        childbox.style.transform = "translateY("+y+"px)";
    }
    //声明变量值
    var startY = 0 ;
    var moveY = 0 ;
    var distanceY= 0 ;
    var isMove = false;    
    var currY = 0 ;
    childbox.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
    });
    
    childbox.addEventListener("touchmove", function (e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        removetransition();
        if((currY + distanceY)>minSwiper && (currY + distanceY)<maxSwiper){
            setTranslateY(currY + distanceY);
        }
        isMove = true;

    });
    window.addEventListener("touchend", function (e) {
        if((currY + distanceY)>maxPosition){
            currY = maxPosition;
            addtransition();
            setTranslateY(currY);
        }else if((currY + distanceY)<minPosition){
            currY = minPosition;
            addtransition();
            setTranslateY(currY);
        }else{
            currY = currY + distanceY;
        }
        
        startY = 0 ;
        moveY = 0 ;
        distanceY= 0 ;
        isMove = false;
    });
    
    myjd.tap(childbox, function (e) {
        for(var i = 0; i<lis.length;i++){
            lis[i].classList.remove("curr");
            lis[i].index = i;
        }
        var currLi = e.target.parentNode;
        currLi.classList.add("curr");
        var index = currLi.index;
        currY = - index*50;
        if(currY > minPosition){
            addtransition();
            setTranslateY(currY);
        }else {
            currY = minPosition;
            setTranslateY(currY);
        }
    });
};
function rightSwiper(){
};
function stopScrolling (event) {
	event.preventDefault();
}
var parentbox = document.querySelector(".listLeft");
parentbox.addEventListener('touchmove',stopScrolling,false);