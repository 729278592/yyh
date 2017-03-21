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
            muiPull:".mui-pull",
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
                mui.ready(function() {
                    mui(opts.pullrefresh).pullRefresh().pullupLoading();
                });
            },
            pullupRefresh:function() {
                $.post(options.interface, {}, function (data) {
                    if (data.status == "ok") {//查询成功
                        opts.res = data.datas;
                        opts.startNum = data.startNum; //最开始显示条数

                        opts.limit = data.limit;//每次上拉时加载条数
                        opts.num = opts.res.orderList.length / opts.startNum;
                        if (opts.res.orderList.length < 1) { //没数据提示
                            opts.notConTip.removeClass("hide");
                            $(opts.muiPull).addClass("hide");
                            return ;
                         }
                        $(opts.muiPull).removeClass("hide");
                        opts.res.sf = Number(opts.res.sf).toFixed(2);
                        opts.res.yf = Number(opts.res.yf).toFixed(2);

                        setTimeout(function () {

                            if(opts.firstLoad){

                                opts.firstLoad = false;
                            mui(opts.pullrefresh).pullRefresh().endPullupToRefresh((++opts.count > opts.num )); //参数为true代表没有更多数据了。

                            var table = $('.invoice');
                            var cells = table.find('.vcList');
                            if (opts.startNum > opts.res.orderList.length) {
                                opts.startNum = opts.res.orderList.length;
                            }
                            else if (opts.startNum * opts.count > opts.res.orderList.length ) {
                                opts.startNum = opts.res.orderList.length - opts.startNum * (opts.count-1);

                            }

                            for (var i = cells.length, len = i + opts.startNum; i < len; i++) {

                                table.append(options.ajaxRecord(opts,opts.res, opts.res.orderList[i], opts.wajxHtml));
                                opts.wajxHtml = '';
                            }

                            }
                        }, 1000,setTimeout(function () {
                            opts.firstLoad = true;
                        },1000));
                        }

                    else {
                       // weui.showMsg("加载失败");
                    }
                },"json")


            }
        };

        Methods.inits($(this));
    };
})(jQuery,window,document,undefined);
