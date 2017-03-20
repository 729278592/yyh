/**
 * Created by WHB on 2016/11/23.
 */

;(function ($,window,document,undefined) {
    $.fn.scrollLoad = function (options) {
        var defaults = {
            loading:"正在加载...",
            limit: 0, //限制条数
            startNum:1, //初始化显示条数
            count:0,
            notConTip:$(".notConTip"),
            num:0,
            wajxHtml:''
        };

        var opts = $.extend({}, defaults, options);

        var Methods = {
            inits: function (_this) {
                mui.init({
                    pullRefresh: {
                        container: opts.pullrefresh,
                        up: {
                            contentrefresh: opts.loading,
                            callback: Methods.pullupRefresh
                        }
                    }
                });
                Methods.loading();
            },
            loading:function () {
              if(mui.os.plus){//上拉时加载
                  mui.plusReady(function() {
                      setTimeout(function() {
                          mui(opts.pullrefresh).pullRefresh().pullupLoading();
                      }, 1000);

                  });
              }else {//第一次加载
                  mui.ready(function() {

                      mui(opts.pullrefresh).pullRefresh().pullupLoading();
                  });
              }
            },
            pullupRefresh:function() {
                $.post(options.interface, {}, function (data) {
                    if (data.status == "ok") {//查询成功
                        opts.res = data.datas;
                        opts.startNum = data.startNum; //最开始显示条数
                        opts.limit = data.limit;//每次上拉时加载条数
                        opts.num = opts.res.length/opts.startNum;
                        if(opts.res.length<1){ //没数据提示
                            opts.notConTip.removeClass("hide");
                        }
                        console.log(opts.res.length)
                        for(var i = 0;i<opts.res.length;i++){ //保留有效数字

                            var num = new Number(opts.res[i].sf);
                            var num1 = new Number(opts.res[i].yf);

                            opts.res[i].sf = num.toFixed(2);
                            opts.res[i].yf = num1.toFixed(2);

                        }

                        setTimeout(function() {
                            mui(opts.pullrefresh).pullRefresh().endPullupToRefresh((++opts.count > opts.num )); //参数为true代表没有更多数据了。

                            var table = $('.invoiceList');
                            var cells = table.find('li');

                            if(opts.startNum>opts.res.length){
                                opts.startNum = opts.res.length;
                            }else if(opts.startNum*opts.count>opts.res.length && opts.startNum<opts.res.length){
                                opts.startNum = opts.res.length-opts.startNum;
                            }

                            for (var i = cells.length, len = i + opts.startNum; i < len; i++) {
                                table.append(options.ajaxRecord(opts.res[i],opts.wajxHtml));
                                opts.wajxHtml = '';
                            }
                        }, 500);
                    }
                    else {
                       // weui.showMsg("加载失败");
                    }
                }, "json");


            }
        };

        Methods.inits($(this));
    };
})(jQuery,window,document,undefined);
