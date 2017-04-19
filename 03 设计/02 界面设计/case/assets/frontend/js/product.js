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
            this.headMain = document.querySelector(".head");
            this.productMenus = document.querySelector(".productMenus");
            this.productMenusLi = this.productMenus.querySelectorAll("li");
            this.caseMenu = document.querySelector(".caseMenu");
            this.caseList = document.querySelector(".caseList");
            this.caseListLi = this.caseList.querySelectorAll("li");
            this.caseMenuLi = this.caseMenu.querySelectorAll("li");
            this.time = 800;
            this.Movetime = 40;
            this.init();//调用函数初始化
        }
        anite.prototype = {
            constructor:anite, //anite为构造函数名
            init:function(){ //函数初始化
                this.onmousewheel();
                this.scroll();
                this.caseFun();
                for(var i = 0;i<this.productMenusLi.length;i++){
                    this.productOver(this.productMenusLi[i]);
                    this.productOut(this.productMenusLi[i]);
                }
                let len = this.caseMenuLi.length;
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
                },this.Movetime)
            },
            getCss:function(obj,attr){ //获取对象样式
                if(obj.currentStyle){
                    return obj.currentStyle[attr];
                }else{
                    return getComputedStyle(obj,false)[attr];
                }
            },
            caseFun:function () { //项目列表
                let len = this.caseMenuLi.length;
                for(let i = 0;i<len;i++){
                    this.caseMenuLi[i].index = i;
                    let that = this;
                    this.caseMenuLi[i].onclick = function () {
                        that.domCaozuo(len,that,this.index);
                    }
                }
            },
            domCaozuo:function (len,that,index) {//项目列表

                $(that.caseMenuLi).eq(index).addClass("active");
                $(that.caseMenuLi).eq(index).siblings().removeClass("active");
                $(that.caseListLi).eq(index).removeClass("hide").animate({opacity:1},200);
                $(that.caseListLi).eq(index).siblings().addClass("hide").animate({opacity:0},200);

                // for(let i = 0; i<len; i++){
                //     that.caseMenuLi[i].classList.remove("active");
                //     that.move(that.caseListLi[i],{opacity:0});
                //     that.caseListLi[i].classList.add("hide")
                // }
                // setTimeout(function () {
                //     that.move(that.caseListLi[index],{opacity:'100'});
                //     that.caseMenuLi[index].classList.add("active");
                //     that.caseListLi[index].classList.remove("hide")
                // },200)
            },
            productOver:function (_this) {
                _this.onmouseover = function () {
                    this.querySelector(".infor").classList.add("active");
                }
            },
            productOut:function (_this) {
                _this.onmouseout = function () {
                    this.querySelector(".infor").classList.remove("active");
                }
            },
            // calculation:function () {  //头部动画
            //     if(doc.body.scrollTop != 0){
            //         this.headMain.classList.add("on");
            //     }else {
            //         this.headMain.classList.remove("on");
            //     }
            // },
            onmousewheel:function(){ //滚轮事件
                doc.onmousewheel = () => {
                    //this.calculation();
                }
            },
            scroll:function(){ //鼠标事件
                doc.onscroll = ()=>{
                    //this.calculation();
                }
            }
        };
        win.anite = anite;
    })(window,document,undefined);
    new anite(".aninteObj");
})