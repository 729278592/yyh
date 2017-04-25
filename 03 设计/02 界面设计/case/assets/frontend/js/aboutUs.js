/**
 * Created by WHB on 2017/4/5.
 */
$(function () {
    /*
     * 面向对象实现;
     * init:初始化
     * move:动画库
     * getCss:获取对象样式
     */

    ;(function(win,doc,unde){  //分号作用是多文件合并时防止上一行代码没写分号而出错
        function anite(){
            this.js_scroll = doc.querySelectorAll(".js_scroll");
            this.headMain  = doc.querySelector(".head");
            this.usMenu = doc.querySelector(".usMenu");
            this.usMenuLi = this.usMenu.querySelectorAll("li");
            this.init();//调用函数初始化
        }
        anite.prototype = {
            constructor:anite, //anite为构造函数名
            init:function(){ //函数初始化
                this.onmousewheel();
                this.scroll();
                this.coumputed();
                this.usMenuLiClick();
            },
            usMenuLiClick:function () {
                for(var i = 0;i<this.usMenuLi.length;i++){
                    this.usMenuLi[i].index = i;
                    var that = this;
                    this.usMenuLi[i].onclick = function () {
                        for(var i = 0;i<that.usMenuLi.length;i++){
                            that.usMenuLi[i].className = '';
                        }
                        that.usMenuLi[this.index].className = 'active';
                        var distanse = $(that.js_scroll[this.index]).offset().top-50;
                        if(this.index === 0){
                            distanse = 0;
                        }
                        $('html, body').animate({
                            scrollTop: distanse
                        }, 400);
                        that.coumputed();
                    }
                }
            },
            coumputed:function(){
                for(var i = 0;i<this.js_scroll.length;i++){
                    if(this.js_scroll[i].getBoundingClientRect().top<this.headMain.offsetHeight){
                        $(".divMenu").css({top:"80px",position:"fixed"});
                        $(".usMenu li").eq(i).addClass("active");
                        $(".usMenu li").eq(i).siblings().removeClass("active");
                    }
                }

                if(this.js_scroll[0].getBoundingClientRect().top<this.headMain.offsetHeight){
                    $(".divMenu").css({top:"80px"});
                }else {
                    $(".divMenu").css({top:"0",position:"relative"});
                }
                
            },
            onmousewheel:function(){ //滚轮事件
                var that = this;
                doc.onmousewheel = function () {
                    that.coumputed();
                    //this.calculation();
                }
            },
            scroll:function(){ //鼠标事件
                var that = this;
                $(win).scroll(function () {
                    that.coumputed();
                    //this.calculation();
                })
            }
        };
        win.anite = anite;
    })(window,document,undefined);
    new anite({

    });
});
