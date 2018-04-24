# markerClustererMobileClick
解决百度地图移动端聚合点无法点击问题

## 用法
直接将js文件的代码考到页面里就好，map代表的是百度地图的实例

## 问题
在使用百度地图聚合点功能的时候遇到的问题，在pc端的时候点击聚合点会自动放大地图，而到了移动端的时候聚合点身上的点击事件失效。去查了一圈应该是移动端的拖拽给禁用掉了，找了一圈也没有直接给出的完整的解决代码，索性自己写了一下。。。。

## 思路
基本思路是当地图触发touch事件的时候触发聚合点身上的点击事件。但是发现了一些问题。

    map.addEventListener("touchstart",function(e){
      var element= e.target;
      element.click();
    })

当地图上触发点击事件时，找到事件源并触发目标节点身上的点击事件。无法点击的问题解决了但是还有两个问题：当单手指拖拽地图的时候，如果手指放在了聚合点身上会直接触发聚合点的点击事件，当两指缩放的时候也是同样的问题。<br/>
解决思路：<br/>单指拖拽的问题判断手指放在屏幕上的时间即可，在touchstart事件时记录开始时间，touchend事件时记录结束事件，两者相减小于一定范围内算做点击，触发目标节点身上的点击事件

      var touchTime = 0;	//按住屏幕的时间
      map.addEventListener("touchstart",function(e){
        touchTime = new Date().getTime();
      },false)
      map.addEventListener("touchend", function(e) {
        var time = new Date().getTime() - touchTime;
        if(time <300) {
          var element= e.target;
          element.click();
        }
      },false)

两指缩放的时候再加上判断屏幕上手指数量的条件即可

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

这样就大致解决了百度地图聚合点在移动端不能点击的问题，但还是有一个小问题。<br>
在两指缩放的时候手指碰到聚合点，不会有扩大缩小的动效，在手指离开的时候会直接放大缩小。。。能力不足暂时没想到怎么解决。。。