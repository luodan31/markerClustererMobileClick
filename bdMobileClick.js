var touchTime = 0;	//按住屏幕的时间
var touches = 0;	//屏幕上手指的数量
map.addEventListener("touchstart",function(e){
  touchTime = new Date().getTime();
  touches = e.touches.length;
},false)
map.addEventListener("touchend", function(e) {
  var time = new Date().getTime() - touchTime;
  if(time <300 && touches == 1) {
    var element= e.target;
    element.click();
  }
},false)