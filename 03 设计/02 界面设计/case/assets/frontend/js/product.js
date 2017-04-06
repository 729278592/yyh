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
            this.init();//调用函数初始化
        }
        anite.prototype = {
            constructor:anite, //anite为构造函数名
            init:function(e){ //函数初始化
                this.onmousewheel();
                this.scroll();
                //this.product();
            },
            product:function () {
              $(".productMenus li").hover(
                  function () {
                      $(this).addClass("active")
                  },
                  function () {

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
                    this.calculation();
                }
            },
            scroll:function(){ //鼠标事件
                doc.onscroll = (e)=>{
                    this.calculation();
                }
            }
        };
        win.anite = anite;
    })(window,document,undefined);
    new anite(".aninteObj");
})