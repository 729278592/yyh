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
            move:function(obj,json,fn){  //动画实现
                json = json || {};
                obj  = obj  ||{};
                clearInterval(obj.iTimer);
                let cur = 0;
                obj.iTimer = setInterval(()=>{
                    let ismove = true;
                    for(let attr in json){
                        let iTarge =  json[attr];
                        if(attr == "opacity"){
                            cur = Math.round(this.getCss(obj,'opacity')*100);
                        } else{
                            cur = parseInt(this.getCss(obj,attr));
                        }
                        let speed = (iTarge-cur)/8;
                        speed = speed>0?Math.ceil(speed):Math.floor(speed);
                        if(cur != iTarge){
                            ismove = false;
                            if(attr == 'opacity'){
                                obj.style.opacity = (cur+speed)/100;
                                obj.style.filter = 'alpha(opacity='+(cur+speed)+')';
                            }
                            else{
                                obj.style[attr] = cur + speed + "px";
                            }
                        }
                        obj.style[attr] = cur + speed + "px";
                    }
                    if(ismove == true){
                        clearInterval(obj.iTimer);
                        fn&&fn.call(obj)
                    }
                },this.time)
            },
            getCss:function(obj,attr){ //获取对象样式
                if(obj.currentStyle){
                    return obj.currentStyle[attr];
                }else{
                    return getComputedStyle(obj,false)[attr];
                }
            },
            // calculation:function () {  //头部动画
            //     if(doc.body.scrollTop != 0){
            //         this.headMain.classList.add("on");
            //     }else {
            //         this.headMain.classList.remove("on");
            //     }
            // },
            usMenuLiClick:function () {
                for(let i = 0;i<this.usMenuLi.length;i++){
                    this.usMenuLi[i].index = i;
                    var that = this;
                    this.usMenuLi[i].onclick = function () {
                        for(let i = 0;i<that.usMenuLi.length;i++){
                            that.usMenuLi[i].className = '';
                        }
                        that.usMenuLi[this.index].className = 'active';
                        var distanse = $(that.js_scroll[this.index]).offset().top-100;
                        if(this.index === 0){
                            distanse = 0;
                        }
                        $('html, body').animate({
                            scrollTop: distanse
                        }, 400);
                    }
                }
            },
            coumputed:function(){
                for(let i = 0;i<this.js_scroll.length;i++){
                    if(this.js_scroll[i].getBoundingClientRect().top<this.headMain.offsetHeight+150){
                        $(".divMenu").css({top:"20%"});
                        $(".usMenu li").eq(i).addClass("active");
                        $(".usMenu li").eq(i).siblings().removeClass("active");
                    }
                }

                if(this.js_scroll[0].getBoundingClientRect().top<this.headMain.offsetHeight+100){
                    $(".divMenu").css({top:"15%"});
                }else {
                    $(".divMenu").css({top:"inherit"});
                }
                
            },
            onmousewheel:function(){ //滚轮事件
                doc.onmousewheel = (e) => {
                    this.coumputed(e);
                    //this.calculation();
                }
            },
            scroll:function(){ //鼠标事件
                doc.onscroll = (e)=>{
                    this.coumputed(e);
                    //this.calculation();
                }
            }
        };
        win.anite = anite;
    })(window,document,undefined);
    new anite({

    });
});
