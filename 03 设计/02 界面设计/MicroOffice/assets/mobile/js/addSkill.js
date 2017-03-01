;(function ($,window,document,undefined) {
    $.fn.technicalExpertise = function (options) {
        var defaults = {
            skillMenu:".skillMenu", //技能专长容器
            oftenSkillList:".oftenSkillList",//常用技能专长容器
            change:"#change", //换一批常用技能专长
            describeInput:".describeInput",//自填技能专长输入框
            describeBtn:".describeBtn",//自填技能专长按钮
            search_clear:".search_clear",//清除输入框
            addSkillDiv:".addSkillDiv",
            arrSkillMenu:[],
            skillTem:"",
            oftenSkillTem:""
        };

        var opts = $.extend({}, defaults, options);

        var Method = {
            init:function (_this) {

                //循环技能专长json数据到页面中
                $.post(options.skillInterface, {}, function (data) {

                    //查询成功
                    if (data.status == "ok") {
                        opts.res = data.datas;
                        for (var i = 0, len = opts.res.length; i < len; i++) {
                            opts.arrSkillMenu.push(opts.res[i].title);
                            _this.find($(opts.skillMenu)).append(options.objSkillTem(opts.res[i],opts.skillTem));
                        }

                        //删除技能专长
                        Method.removeSkill(_this);
                    }

                    //查询失败
                    else {
                        weui.showMsg("加载失败");
                    }
                }, "json");

                //循环常用技能json数据到页面中
                setTimeout(function () {
                    $.post(options.oftenSkillInterface, {}, function (data) {

                        //查询成功
                        if (data.status == "ok") {
                            opts.res = data.datas;

                            for (var j = 0; j < opts.res[0].children.length; j++) {
                                _this.find($(opts.oftenSkillList)).append(options.objOftenSkillTem(opts.res[0].children[j],opts.oftenSkillTem));
                            }

                            //添加技能专长
                            Method.addSkill(_this);
                        }

                        //查询失败
                        else {
                            weui.showMsg("加载失败");
                        }
                    }, "json");
                });

                Method.ownAddSkill(_this);//手动添加技能专长
                Method.clearInput(_this);//清除添加技能标签的输入框
            },
            removeSkill:function (_this) {//删除技能专长
                _this.find($(opts.skillMenu)).on("touchend",".fa-remove",function () {
                    var oftenSkill = _this.find($(opts.oftenSkillList));
                    var text = $(this).closest("li").find("span").text();
                    for(var i = 0;i<opts.arrSkillMenu.length;i++){
                        if($.trim(text)==$.trim(opts.arrSkillMenu[i])){
                            opts.arrSkillMenu.splice(i, 1);
                            // console.log(oftenSkill.find($(text)).closest("li"))
                            // oftenSkill.find($(text)).closest("li").removeClass("active");
                        }
                    }
                    weui.showMsg("删除成功");
                    $(this).closest("li").remove();
                })
            },
            addSkill:function (_this) {//从常用技能标签中添加技能专长
                var oftenSkill = _this.find($(opts.oftenSkillList));

                oftenSkill.on("touchend","li",function () {
                    var trimText = $(this).text();
                    if($.inArray($.trim(trimText), opts.arrSkillMenu) < 0){
                       // $(this).addClass('active');
                        opts.arrSkillMenu.push($.trim(trimText));
                        _this.find($(opts.skillMenu)).append('<li><span>'+$.trim(trimText)+'</span><i class="fa fa-remove"></i></li>');
                        return ;
                    }
                    weui.showMsg("技能标签已存在");
                })
            },
            ownAddSkill:function (_this) {//手动添加技能专长
                var describeInput = _this.find($(opts.describeInput));
                var describeBtn = _this.find($(opts.describeBtn));
                describeBtn.on("touchend",function () {

                    var a=describeInput.val(),b;
                    b=a.replace(/，|,/g,"");
                    if(a.length!=b.length){
                        weui.showMsg('标签不能含逗号');
                    }

                    if($.trim(describeInput.val())==''){
                        weui.showMsg("标签名不能为空");
                        return ;
                    }

                    if($.inArray($.trim(describeInput.val()), opts.arrSkillMenu) < 0){
                        _this.find($(opts.skillMenu)).append('<li><span>'+$.trim(describeInput.val())+'</span><i class="fa fa-remove"></i></li>');
                        opts.arrSkillMenu.push($.trim(describeInput.val()));
                        return ;
                    }
                    weui.showMsg("技能标签已存在");

                })
            },
            clearInput:function (_this) { //清除添加技能标签的输入框
                var search_clear = _this.find($(opts.search_clear));
                var describeInput = _this.find($(opts.describeInput));

                describeInput.on('keyup', function () {
                    var clear = $(this).closest($(opts.addSkillDiv)).find(search_clear);
                    if($.trim($(this).val())){
                        clear.removeClass("hide");
                    }else{
                        clear.addClass("hide");
                    }
                });
                search_clear.on('touchend', function () {
                    $(this).closest($(opts.addSkillDiv)).find(describeInput).val('');
                    $(this).addClass("hide");
                });
            }
        };
        Method.init($(this));
    };
})(jQuery,window,document,undefined);
