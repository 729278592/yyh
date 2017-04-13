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
        function anite(options){
            this.time = options.time;
            this.left = ".left";
            this.right = ".right";
            this.maskCase = ".maskCase";
            this.aninteObj = document.querySelectorAll(options.aninteObj);
            this.menuCase = document.querySelector(".menuCase");
            this.productMenu = document.querySelectorAll(".productMenu");
            this.menuCaseLi = this.menuCase.querySelectorAll("li");
            this.headMain = document.querySelector(".head");
            this.aninteObjSonWidth = doc.documentElement.clientWidth*0.5;
            for(let i = 0;i<this.aninteObj.length;i++){
                let obj = this.aninteObj[i];
                obj.querySelector(this.left).style.left   = -this.aninteObjSonWidth+"px";
                obj.querySelector(this.right).style.right = -this.aninteObjSonWidth+"px";
            }
            this.init();//调用函数初始化
        }
        anite.prototype = {
            constructor:anite, //anite为构造函数名
            init:function(e){ //函数初始化
                this.onmousewheel();
                this.scroll();
                this.coumputed(e);
                this.caseFun();
                this.onMouseFun();
                let len = this.menuCaseLi.length;
                this.domCaozuo(len,this,0); //合作案例
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
            coumputed:function(){  // 节点分别从左右进入
                for(let i = 0;i<this.aninteObj.length;i++){

                    if(this.aninteObj[i].getBoundingClientRect().top<doc.documentElement.clientHeight){
                        let obj = this.aninteObj[i];
                        $(obj.querySelector(this.left)).animate({'left': 0},700);
                        $(obj.querySelector(this.right)).animate({'right': 0},700);
                    }
                    else{
                        // let obj = this.aninteObj[i];
                        // $(obj.querySelector(this.left)).animate({'left': -this.aninteObjSonWidth},500);
                        // $(obj.querySelector(this.right)).animate({'right': -this.aninteObjSonWidth},500);
                    }
                }
            },
            caseFun:function (){ //合作案例
                let len = this.menuCaseLi.length;
                for(let i = 0;i<len;i++){
                    this.menuCaseLi[i].index = i;
                    let that = this;
                    this.menuCaseLi[i].onclick = function () {
                        that.domCaozuo(len,that,this.index);
                    }
                }
            },
            domCaozuo:function (len,that,index) {//合作案例
                for(let i = 0; i<len; i++){
                    that.menuCaseLi[i].className = '';
                    that.move(that.productMenu[i],{opacity:0});
                    that.productMenu[i].classList.add("hide")
                }
                setTimeout(function () {
                    that.move(that.productMenu[index],{opacity:'100'});
                    that.menuCaseLi[index].className = 'active';
                    that.productMenu[index].classList.remove("hide")
                },200)
            },
            onMouseFun:function () {
                $(this.productMenu).find("li").hover(
                    function () {
                        $(this).find(".maskCase").removeClass("hide");
                        $(this).siblings("li").find(".maskCase").addClass("hide");
                        $(this).find(".maskCase-bg").removeClass("hide");
                        $(this).siblings("li").find(".maskCase-bg").addClass("hide");
                    },
                    function () {
                        $(this).find(".maskCase").addClass("hide");
                        $(this).find(".maskCase-bg").addClass("hide");
                    }
                )
            },
            calculation:function () {  //头部动画
                if(doc.body.scrollTop != 0){
                    this.headMain.classList.add("on");
                }else {
                    this.headMain.classList.remove("on");
                }
            },
            onmousewheel:function(){ //滚轮事件
                doc.onmousewheel = (e) => {
                    this.coumputed(e);
                    this.calculation();
                }
            },
            scroll:function(){ //鼠标事件
                doc.onscroll = (e)=>{
                    this.coumputed(e);
                    this.calculation();
                }
            }
        };
        win.anite = anite;
    })(window,document,undefined);
});