;(function ($,window,document,undefined) {
    $.fn.scrollLoad = function (options) {
        var defaults = {

        };

        var opts = $.extend({}, defaults, options);

        var Methods = {
            init: function (_this) {

            },
            loadData:function () {
                weui.startLoading();
                setTimeout(function () {
                    $.ajax({
                        type : "get",
                        url : "../../assets/mobile/data/myRecord.json",
                        dataType : "json",
                        cache : false,
                        success : function(data) {
                            if(data.status == "ok"){
                                var res = data;
                                var resData = data.datas;
                                var len = resData.length;
                                for(var i = 0;i<len;i++){
                                    resData[i].on = false;
                                    var lenChild = resData[i].children;
                                    for(var j = 0;j<lenChild.length;j++){
                                        lenChild[j].prevent = (parseInt(lenChild[j].totalPeploeNum) - parseInt(lenChild[j].surplusPeploeNum))/parseInt(lenChild[j].totalPeploeNum)*100+"%" ;
                                    }
                                }
                                //console.log(JSON.stringify(res));
                                resData[res.num].on = true;
                                ko.applyBindings({myRecordData:res});
                                weui.stopLoading();
                            }
                        }
                    });


                    addActive = function (index,data) {

                        console.log(index())
                    };
                },500);
            }
        };

        Methods.init($(this));
    };
})(jQuery,window,document);
