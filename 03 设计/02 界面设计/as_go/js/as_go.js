/**
 * Created by WHB on 2015/7/27.
 */


    /*左边产品页面菜单切换*/
//    var wd = $(".wrap div"),
//        wa = $(".wrap .active");
//    wd.on("click",function(){
//        var c = $(this);
//        if( c.is(".active")){
//
//        }
//        else{
//            c.next().slideDown();
//            c.addClass("active");
//            c.parent().siblings().find("div").removeClass("active");
//            c.parent().siblings().find(".menu").slideUp();
//        }
//    });
//    wa.next().removeClass("hide");



    /*套件菜单的控制*/
    var pw = $(".page_content_left .wrap"),
        pfl = $(".header .fr .list"),
        isdian = true;
    pfl.on("click",function(){
        if(isdian == true){
            pw.slideUp();
            //$(".footer_suite").css({"position":"absolute"});
            isdian = false;
        }
        else if(isdian == false){
            pw.slideDown();
            isdian = true;
           // $(".footer_suite").css({"position":"relative"});
        }
    });
    var ww = document.body.clientWidth;
$(window).on("resize",function(){
    if(($(".page_content_left .wrap").css("display")=="none")){
        pw.slideDown();
        isdian = true;
    }
});




    var pl = $(".product_ul li");
    pl.hover(
        function(){
            $(".title_box").show();
            $(this).find(".title_box").animate({
                "top":"100%"
            },200);
            $(this).find(".plus").fadeOut(500)
        },
        function(){
            $(this).find(".title_box").animate({
                "top":"0"
            },200);
            $(this).find(".plus").fadeIn(500)
        });
    var ii = $(".item_div").parent();
    ii.hover(
        function(){

            $(this).find(".item_box").animate({
                "top":"0%"
            },200);
        },
        function(){
            $(this).find(".item_box").animate({
                "top":"100%"
            },200);
        });



    var jp = $(".js_product"),
        m = $(".myCarousel"),
        mi = $(".myCarousel .item"),
        mid = $(".myCarousel .item .describe");
    pl.each(function(i){
        $(this).on("click",function(){
            jp.addClass("hide");
            m.removeClass("hide");
            mi.eq(i).addClass('active');
            mi.eq(i).siblings().removeClass("active");

            mi.find("img").fadeIn(2000);
            mid.animate({
                "top":"40%"
            },3000);
            var mc = $(".myCarousel .close");
            mc.on("click",function(){
                mc.parent().addClass("hide");
                jp.removeClass("hide");
                mi.find("img").hide();
                mid.animate({
                    "top":"-20%"
                },0);
            });

        });
    });


    var nl = $(".nav-pills>li"),
        lt = $(".login_type");
    nl.each(function(i){
        $(this).on("click",function(){
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
            lt.eq(i).removeClass("hide");
            lt.eq(i).siblings(".login_type").addClass("hide")
        });
    });



    var sls = $(".station_head li .station_name"),
        s = $(".station_name"),
        sl = $(".station_content li");
    sls.each(function(i){
        $(this).on("click",function(){
            $(this).addClass("active");
            $(this).parent().siblings().find(s).removeClass("active");
            $(this).parent().parent().siblings().find(s).removeClass("active");
            $(this).parent().parent().siblings(".station_content").find("li").slideUp();
            sl.eq(i).slideDown();
            sl.eq(i).siblings().css({"display":'none'});
        });
    });


    /*index return top*/
//$(".we .top").hide();
//$(window).scroll(function(){  //jquery的scroll()方法
//    if($(this).scrollTop()>250){
//        $(".we .top").fadeIn(1000);
//
//    }  //jquery的fadeIn()显示方法
//    else{$(".we .top").fadeOut(1000);}  //jquery的fadeIn()隐藏方法
//});

//w.mouseover(function(){
//    $(this).find("i").removeClass("fa-angle-up");
//    $(this).html("返回顶部");
//    $(this).find("i").css({"fontSize":"13px"})
//} );
//w.mouseout( function(){
//    $(this).find("i").addClass("fa-angle-up");
//    $(this).html('<i class="fa fa-angle-up" style="top: 3px;font-size: 30px;"></i>');
//    $(this).find("i").css({"fontSize":"30px"})
//});
    var w = $(".we .last");
    w.click(function(){$("html,body").animate({scrollTop:0},"fast");return false;});
    $(".message,.phone").hover(function(){
            $(this).find(".qqgroup-show").removeClass("hide");
            $(this).find(".telphone-show").removeClass("hide");
        },
        function(){
            $(this).find(".qqgroup-show").addClass("hide");
            $(this).find(".telphone-show").addClass("hide");
        }
    );
    var t = $(".tuo_code");
    t.hover(
        function(){
            $(this).find(".qrcode").removeClass("hide");
        },
        function(){
            $(this).find(".qrcode").addClass("hide");
        }
    );



    var ql = $(".question li");

    ql.find("p").on("click",function(){
        if($(this).next().css("display") == "none"){
            $(this).next().slideDown();
            $(this).parent().siblings().find("div").slideUp()
        }
        else{
            $(this).next().slideUp()
        }
    });





/*login*/
var il = $(".immediately_log");
    var iN = $("#inputName");
    var iP = $("#inputPassword");
    var ne = $(".NameEmpty");
    var pe = $(".PasswordEmpty");
    var e  = $(".Exists");
    var NE = $(".NotExists");
    var eP = $(".errorPassword");
    il.on("click",function(){
        if((iN.val()=="")&&(iP.val()=="")){
            ne.removeClass("hide");
            pe.removeClass("hide")
        }
        else if((iN.val()=="")&&(iP.val()!="")){
            ne.removeClass("hide");
            pe.addClass("hide");
            e.addClass("hide");
            NE.addClass("hide");
        }
        else if((iN.val()!="")&&(iP.val()=="")){
            ne.addClass("hide");
            pe.removeClass("hide");
            eP.addClass("hide");
        }
        else if((iN.val()!="")&&(iP.val()!="")){
            ne.addClass("hide");
            pe.addClass("hide");
            e.addClass("hide");
            NE.addClass("hide");
            eP.addClass("hide");
            $(this).val("正在登录中...");
            if(iN.val()=="已存在"){
                e.removeClass("hide");
                NE.addClass("hide");
            }
            else if(iN.val()=="不存在"){
                NE.removeClass("hide");
                e.addClass("hide");
            }
            else if(iP.val()=="as"){
                eP.removeClass("hide");
            }else{
                e.addClass("hide");
                NE.addClass("hide");
                eP.addClass("hide");
            }
        }
    });















