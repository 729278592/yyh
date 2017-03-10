;(function ($,window,document,undefined) {
    $.fn.shoppingAnimate = function (options) {
        var defaults = {
            shoppingList : $(".shoppingList"),
            shopTypeListLi : $(".shoppingList li"),
            wrapper : $(".wrapper"),
            closeImg : $(".closeImg"),
            weuiTransition : ".weui-mask_transparent",
            weui_actionsheet : $(".weui_actionsheet"),
            btnAddCat : ".btnAddCat",
            $shop:$('.shoopCarBody'),
            totalMoney:".totalMoney span",
            specifiLi:'',
            wajxHtml : ''
        };

        var opts = $.extend({}, defaults, options);

        var Methods = {
            init: function (_this) {
                Methods.judgmentStandard(_this); //判断有无规格
                opts.wrapper.on("touchend",".closeImg",function (e) {
                    // if($(e.target).attr("class")=="closeImg"){
                    //     e.preventDefault();
                    //     Methods.removeMask($(this));
                    // }
                    e.preventDefault();
                    Methods.removeMask($(this)); //点击关闭删除规格弹窗
                });

                opts.wrapper.on("touchend",".btnAddCat",function () {
                    Methods.addSHoppingCart($(this)); //点击规格弹窗中的加入购物车去加入购物车
                });

                opts.wrapper.on("touchend",opts.shopTypeListLi,function (e) {
                    if($(e.target).parent().attr("class")=="shopTypeList clearfix"){
                        Methods.chioceGg($(e.target)); //点击选择规格
                    }
                })

            },
            jsInfor:function (that) { //取出相应规格的价格
                $(".nums>span").text(that.data("price"));
                $(".name").text(that.text());
            },
            addShoping:function(_this){
                var $shop = $('.shoopCarBody'),
                    $num = $('.num');
                var x = _this.offset().left,
                    y = _this.offset().top,
                    X = $num.offset().left,
                    Y = $num.offset().top ;


                if ($('#floatOrder').length <= 0) {
                    $('body').append('<div id="floatOrder"></div>');
                }
                var $obj = $('#floatOrder');
                if(!$obj.is(':animated')){
                    $obj.css({'left': x,'top': y}).animate({'left': X,'top': Y},500,function() {
                        $obj.stop(false, false).animate({'top': Y,'opacity':0},500,function(){
                            $obj.fadeOut(300,function(){
                                $obj.remove();

                                var	num = Number($num.text());//数量增加
                                $num.text(num+1);
                                if(_this.is(".order_menu")){
                                    $(opts.totalMoney).text($num.text()*_this.closest("li").find(".money").text());
                                    return;
                                }
                                if(_this.is(".menu_infor")){
                                    $(opts.totalMoney).text($num.text()*_this.closest(".dishInfor").find(".money").text());
                                    return;
                                }

                                if(_this.is(".btnAddCat")){
                                    $(opts.totalMoney).text($num.text()*_this.closest(".weui-actionsheet__menu").find(".money").text())
                                    return;
                                }

                            });
                        });
                    });
                }
            },
            ajaxRecord:function(opt,wajxHtml,specifiLi){//规格弹窗的模板
                wajxHtml += '<div class="weui-mask_transparent" id="mask"></div>'+
                            '<div class="weui-actionsheet" id="weui-actionsheet">'+
                                '<div class="weui-actionsheet__menu">'+
                                    '<div class="weui_con_hd">'+
                                        ''+opt.name+''+
                                        '<span class="closeImg">×</span>'+
                                    '</div>'+
                                    '<div class="shopType style">'+
                                        '<p class="title">选择规格 :</p>'+
                                        '<ul class="shopTypeList clearfix">';
                            wajxHtml += specifiLi;
                            wajxHtml += '</ul>'+
                                    '</div>'+
                                    '<div class="weui_con_ft clearfix">'+
                                        '<div class="left">'+
                                            '<span class="nums ">￥<span class="money"></span></span> '+
                                            '( <span class="name"></span>)'+
                                        '</div>'+
                                        '<div class="right">'+
                                            '<a class="btnAddCat" id="btnAddCat">'+
                                            '<img src="../../assets/mobile/images/cart.png" class="cart" alt="">'+
                                            '加入购物车'+
                                        '</a>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
                        return wajxHtml;
            },
            ajaxGg:function () {
                var that = this;
                $.ajax({
                    url: opts.shoppingList,
                    dataType: 'json',
                    data: '',
//                  jsonp: 'callback',
                    success: function (res) {
                        if(res.status == "ok"){
                            var wajxHtml = '';
                            for(var i=0; i<res.datas.length; i++){ //循环规格json数据的,并将规格的价格艺术性的方式添加入相应的规格结构中
                                opts.specifiLi += '<li data-price="'+res.datas[i].price+'"> '+res.datas[i].specifi+' </li>';
                            }

                            opts.wrapper.append(that.ajaxRecord(res,wajxHtml,opts.specifiLi));//加入购物车弹窗添加到wrapper

                            if(!opts.shopTypeListLi.is(".active")){ //打开购物车弹窗是默认选中第一个规格
                                $(".shopTypeList li:first-child").addClass("active");
                                Methods.jsInfor($(".shopTypeList li.active"));//获取默认选中规格
                            }

                        }else{

                        }
                    }
                });
            },
            shopAnimate:function (_this) {
                Methods.addShoping(_this);
                //提交商品信息
                $.post(opts.interface,{shopId:opts.shoppingId},function(res){
                    if(res.status == "ok"){

                    }else{

                    }
                });
            },
            judgmentStandard:function (_this) {
                if(!opts.specifications){ //无规格
                    Methods.shopAnimate(_this); //加入购物车动画
                }
                else {//有规格
                    Methods.ajaxGg(); //请求规格json数据
                }
            },
            addSHoppingCart:function (that) {
                Methods.shopAnimate($(opts.btnAddCat));
                // setTimeout(function () {
                //     Methods.removeMask(that)
                // },800)
            },

            chioceGg:function (that) { //点击选择规格
                that.addClass("active");
                that.siblings().removeClass("active");
                Methods.jsInfor(that); ////获取选中规格
            },

            removeMask:function (that) {//删除规格弹框

                $(opts.weuiTransition).remove();
                that.closest(".weui-actionsheet").remove();
            }
        };

        Methods.init($(this));
    };
})(jQuery,window,document,undefined);