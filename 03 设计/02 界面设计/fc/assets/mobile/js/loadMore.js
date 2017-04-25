/**
 * Created by WHB on 2016/11/23.
 */

;(function ($,window,document,undefined) {
    "use script"
    $.fn.scrollLoad = function (options) {
        var defaults = {
            startNum:7,
            limit: 16,
            wajxHtml:'',
            notData:".notData",
            notConTip:".notConTip",
            firstLoad:true//第一次加载为true

        };
        
        var opts = $.extend({}, defaults, options);
        
        var Methods = {
            init: function (_this) {
                $.post(opts.infers,{},function(data){
                    opts.res = data.datas;
                    if(data.status == "ok"){
                        Methods.loading(true,opts.res,_this);
                    }else {
                        weui.showMsg("加载失败");
                    }
                },"json");
                Methods.scrollLoad(_this)
            },
            loading : function(flag,res,_this){

                if(opts.firstLoad){
                    weui.startLoading();
                    setTimeout(function(){
                        weui.stopLoading();
                        if(res.length === 0){
                            $(opts.notConTip).removeClass("hide");
                            $ (window).unbind ('scroll');
                            return;
                        }
                        else if(res.length<opts.startNum){
                            opts.startNum = res.length;
                            $(opts.notData).removeClass("hide");
                            $ (window).unbind ('scroll');
                        }
                        for(var i = 0;i<opts.startNum;i++){
                            _this.append(opts.ajaxRecord(res[i],opts.wajxHtml));
                        }
                        opts.wajxHtml = '';
                    },500);
                    return;
                }

                if(!opts.firstLoad){
                    weui.startLoading();
                    setTimeout(function(){
                        weui.stopLoading();
                        if(opts.startNum+opts.limit>res.length){
                            if((opts.limit>res.length-opts.startNum)&&(res.length-opts.startNum>0)){
                                for(var i = opts.startNum;i<res.length;i++){
                                    _this.append(opts.ajaxRecord(res[i], opts.wajxHtml));
                                }
                                opts.startNum = opts.limit + opts.startNum;
                                opts.wajxHtml = '';
                            }
                            return;
                        }

                        for (var i = opts.startNum; i < opts.startNum + opts.limit; i++) {
                            _this.append(opts.ajaxRecord(res[i], opts.wajxHtml));
                        }

                        opts.startNum = opts.limit + opts.startNum;
                        opts.wajxHtml = '';
                    },100);
                }
            },
            scrollLoad:function(_this){
                $(window).scroll(function () {
                    var scrollTop = $(this).scrollTop();
                    var scrollHeight = $(document).height();
                    var windowHeight = $(this).height();

                    if (scrollTop + windowHeight == scrollHeight) {

                        if(opts.timeOutFlag){
                            return;
                        }
                        opts.timeOutFlag = setTimeout(function(){
                            if(opts.startNum>opts.res.length){
                                weui.showMsg("无更多数据");
                                $(opts.notData).removeClass("hide");
                                $ (window).unbind ('scroll');
                                return;
                            }
                            $.post(opts.infers, {}, function (data) {
                                if (data.status == "ok") {//查询成功
                                    opts.res = data.datas;
                                    opts.firstLoad = false;

                                    Methods.loading(true, opts.res, _this);
                                }
                                else {
                                    weui.showMsg("加载失败");
                                }
                            }, "json");
                            setTimeout(function(){opts.timeOutFlag = undefined;},200);

                        })
                    }
                });
            }
        };
        
        Methods.init($(this));
    };
})(jQuery,window,document);