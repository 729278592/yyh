/**
 * 弹框组件的封装
 */
var maskDailog = function(){

    /*
    * 公共弹框组件
    * */
    var commonDailog = function(opts)       {
        var btns = '';
        //var btnArr = [];
        for(var i = 0; i < opts.buttons.length; i++){
            btns += '<button class="'+opts.buttons[i].classType+'" type="button" data-type="'+opts.buttons[i].btnType+'">'+opts.buttons[i].type+'</button>';
           // btnArr.push(opts.buttons[i].btnType);
        }

        var temp =  '<div class="mask-bg"></div>'+
                    '<div class="mask">'+
                        '<div class="dailog">'+
                            '<div class="dailogHead">'+opts.title+'</div>'+
                            '<div class="dailogContent style">'+
                                '<p>'+
                                    '<span class="type">'+opts.content+'</span>'+
                                '</p>'+
                                '<div class="opreateBtn">'+
                                    btns+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';

        var $dialogWrap = $(temp);
        var $dialog = $dialogWrap.find('.mask');
        var $mask = $dialogWrap.find('.mask-bg');

        $('body').append($dialogWrap);
        $mask.fadeIn('normal');
        $dialog.fadeIn('normal');

        for(var i = 0; i < opts.buttons.length; i++){
            $dialogWrap.on('click', '.'+opts.buttons[i].classType, function () {
                var dataType = $(this).data("type");
                if(dataType){
                    opts.success(function () {
                        $mask.fadeOut('normal');
                        $dialog.fadeOut('normal');
                        $dialogWrap.remove();
                    });
                    return ;
                }
                if(!dataType){
                    $dialogWrap.remove();
                    return ;
                }
            });
        }
    };

    /*
     * confirm弹框组件
     * */
    var confirmDailog = function(options) {
       // options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var opts = $.extend({
            title: "标题",
            content: "内容",
            buttons: [
                        {
                            type: '确定',
                            classType: 'btnSure',
                            btnType:true
                        },
                        {
                            type: '取消',
                            classType: 'btnCancel',
                            btnType:false
                        }
                    ]
        }, options);
        commonDailog(opts);
    };

    /*
     * alert弹框组件
     * */
    var alertDailog = function(options) {
        // options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var opts = $.extend({
            title: "标题",
            content: "内容",
            buttons: [
                {
                    type: '确定',
                    classType: 'btnSure',
                    btnType:false
                }
            ]
        }, options);
        commonDailog(opts);
    };




    /*
     * 公司注册雇主品牌弹框
     * */
    var addCompany= function (options) {
        var opts = $.extend({
            title: "标题",
            buttons: [
                {
                    type: '确定',
                    classType: 'btnSure',
                    btnType:true
                }
            ]
        }, options);
        var btns = '';
        //var btnArr = [];
        for(var i = 0; i < opts.buttons.length; i++){
            btns += '<button class="'+opts.buttons[i].classType+'" type="button" data-type="'+opts.buttons[i].btnType+'">'+opts.buttons[i].type+'</button>';
            // btnArr.push(opts.buttons[i].btnType);
        }

        var temp =  '<div class="mask-bg"></div>'+
            '<div class="mask">'+
            '<div class="dailog dailogStyle">'+
            '<div class="dailogHead">'+opts.title+'</div>'+
            '<div class="dailogContent">'+
            '<form action="###" class="form">'+

            '<div class="inforCon">'+
                '<div class="div-form">'+
                    '<div class="form-group">'+
                        '<div class="w100">'+
                            '<span class="type">公司名称 : </span>'+
                            '<input type="text" class="inputText" placeholder="请输入公司名称" id="companyName">'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<div class="w100">'+
                            '<span class="type">公司规模 : </span>'+
                            '<select name="" class="selectText" style="width: 380px;">'+
                                '<option value="100人">100人</option>'+
                                '<option value="大">大</option>'+
                                '<option value="大">大</option>'+
                                '<option value="大">大</option>'+
                            '</select>'+
                            '<span style="top: 13px;">'+
                                                    '<i class="fa fa-caret-down"></i>'+
                                                '</span>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<div class="w100">'+
                            '<span class="type">所属行业 : </span>'+
                            '<select name="" class="selectText" style="width: 380px;">'+
                                '<option value="餐饮业">餐饮业</option>'+
                                '<option value="餐饮业">餐饮业</option>'+
                                '<option value="餐饮业">餐饮业</option>'+
                                '<option value="餐饮业">餐饮业</option>'+
                            '</select>'+
                            '<span style="top: 13px;">'+
                                                    '<i class="fa fa-caret-down"></i>'+
                                                '</span>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<div class="w100">'+
                            '<span class="type">公司官网 : </span>'+
                            '<input type="text" class="inputText" placeholder="请输入公司官网" id="companyUrl">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+

            '<div class="opreateBtn">'+
            btns+
            '</div>'+

            '</form>'+
            '</div>'+
            '</div>'+
            '</div>';

        var $dialogWrap = $(temp);
        var $dialog = $dialogWrap.find('.mask');
        var $mask = $dialogWrap.find('.mask-bg');

        $('.content-wrapper').append($dialogWrap);
        $mask.fadeIn('normal');
        $dialog.fadeIn('normal');

        for(var i = 0; i < opts.buttons.length; i++){
            $dialogWrap.on('click', '.'+opts.buttons[i].classType, function () {
                var dataType = $(this).data("type");
                if(dataType){
                    opts.success(function () {
                        $mask.fadeOut('normal');
                        $dialog.fadeOut('normal');
                        $dialogWrap.remove();
                    });
                    return ;
                }
                if(!dataType){
                    $dialogWrap.remove();
                    return ;
                }
            });
        }
    };



    /*
    * 添加员工弹框
    * */
    var addStaffDailog = function (options) {
        var opts = $.extend({
            title: "标题",
            buttons: [
                {
                    type: '保存',
                    classType: 'btnSure',
                    btnType:true
                },
                {
                    type: '取消',
                    classType: 'btnCancel',
                    btnType:false
                }
            ]
        }, options);
        var btns = '';
        //var btnArr = [];
        for(var i = 0; i < opts.buttons.length; i++){
            btns += '<button class="'+opts.buttons[i].classType+'" type="button" data-type="'+opts.buttons[i].btnType+'">'+opts.buttons[i].type+'</button>';
            // btnArr.push(opts.buttons[i].btnType);
        }

        var temp =  '<div class="mask-bg"></div>'+
                    '<div class="mask">'+
                        '<div class="dailog dailogStyle">'+
                            '<div class="dailogHead">'+opts.title+'</div>'+
                            '<div class="dailogContent">'+
                                '<form action="###" class="form">'+
                                    '<div class="inforCon">'+
                                        '<p class="inforTitle">基本信息</p>'+
                                        '<div class="div-form">'+
                                            '<div class="form-group">'+
                                                '<div class="w100">'+
                                                '<span class="type">员工姓名 : </span>'+
                                                '<input type="text" class="inputText" placeholder="请输入员工姓名" id="staffName"/>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="form-group">'+
                                                '<div class="w100">'+
                                                    '<span class="type">手机号码 : </span>'+
                                                    '<input type="text" class="inputText" placeholder="请输入手机号码" id="mobile"/>'+
                                                '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="already">状态 : 已关联</div>'+
                                        '<div class="inforCon">'+
                                        '<p class="inforTitle">月度任务</p>'+
                                        '<div class="div-form active">'+
                                        '<div class="form-group">'+
                                        '<div class="w100">'+
                                        '<span class="type">主页转发 : </span>'+
                                            '<input type="number" class="inputText" placeholder="请输入主页转发" id="zfNum" min="0" max="100" step="1"/>'+
                                        '</div>'+
                                        '</div>'+
                                        '<div class="form-group">'+
                                        '<div class="w100">'+
                                        '<span class="type">职位转发 : </span>'+
                                            '<input type="number" class="inputText" placeholder="请输入职位转发" id="jobNum" min="0" max="100" step="1"/>'+
                                        '</div>'+
                                        '</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div>' +
                                    '</div>'+
                                    '<div class="opreateBtn">'+
                                        btns+
                                    '</div>'+
                                '</form>'+
                            '</div>'+
                        '</div>'+
                    '</div>';

        var $dialogWrap = $(temp);
        var $dialog = $dialogWrap.find('.mask');
        var $mask = $dialogWrap.find('.mask-bg');

        $('.content-wrapper').append($dialogWrap);
        $mask.fadeIn('normal');
        $dialog.fadeIn('normal');

        for(var i = 0; i < opts.buttons.length; i++){
            $dialogWrap.on('click', '.'+opts.buttons[i].classType, function () {
                var dataType = $(this).data("type");
                if(dataType){
                    opts.success(function () {
                        $mask.fadeOut('normal');
                        $dialog.fadeOut('normal');
                        $dialogWrap.remove();
                    });
                    return ;
                }
                if(!dataType){
                    $dialogWrap.remove();
                    return ;
                }
            });
        }
    };


    /*
     * 上传文件弹框
     * */
    var upFileDailog = function (options) {
        var opts = $.extend({
            title: "标题",
            buttons: [
                {
                    type: '上传',
                    classType: 'btnSure',
                    btnType:true
                },
                {
                    type: '取消',
                    classType: 'btnCancel',
                    btnType:false
                }
            ]
        }, options);
        var btns = '';
        //var btnArr = [];
        for(var i = 0; i < opts.buttons.length; i++){
            btns += '<button class="'+opts.buttons[i].classType+'" type="button" data-type="'+opts.buttons[i].btnType+'">'+opts.buttons[i].type+'</button>';
            // btnArr.push(opts.buttons[i].btnType);
        }

       var temp =   '<div class="mask-bg"></div>'+
                    '<div class="mask">'+
                    '<div class="dailog dailogStyle">'+
                    '<div class="dailogHead">'+opts.title+'</div>'+
                    '<div class="dailogContent">'+
                    '<form action="###" class="form">'+
                    '<div class="inforCon">'+
                    '<p>请按照指定的模板格式上传数据。'+
                '<a href="###" class="right">下载模板</a>'+
                    '</p>'+
                    '<div class="upFile clearfix">'+
                    '<span class="left">文件名</span>'+
                    '<label class="upFileBtn right" for="xFile">上传文件</label>'+
                    '<input type="file" name="file" class="upFileInput" id="xFile" multiple="multiple" accept="application/msword">'+
                    '</div>'+
                    '</div>'+
                    '<div class="opreateBtn">'+
                     btns+
                    '</div>'+
                    '</form>'+
                    '</div>'+
                    '</div>'+
                    '</div>';

        var $dialogWrap = $(temp);
        var $dialog = $dialogWrap.find('.mask');
        var $mask = $dialogWrap.find('.mask-bg');

        $('.common-list').append($dialogWrap);
        $mask.fadeIn('normal');
        $dialog.fadeIn('normal');

        for(var i = 0; i < opts.buttons.length; i++){
            $dialogWrap.on('click', '.'+opts.buttons[i].classType, function () {
                var dataType = $(this).data("type");
                if(dataType){
                    opts.success(function () {
                        $mask.fadeOut('normal');
                        $dialog.fadeOut('normal');
                        $dialogWrap.remove();
                    });
                    return ;
                }
                if(!dataType){
                    $dialogWrap.remove();
                    return ;
                }
            });
        }
    };


    /*
     * 修改转发任务弹框
     * */
    var forwardDailog = function (options) {
        var opts = $.extend({
            title: "标题",
            buttons: [
                {
                    type: '保存',
                    classType: 'btnSure',
                    btnType:true
                },
                {
                    type: '取消',
                    classType: 'btnCancel',
                    btnType:false
                }
            ]
        }, options);
        var btns = '';
        for(var i = 0; i < opts.buttons.length; i++){
            btns += '<button class="'+opts.buttons[i].classType+'" type="button" data-type="'+opts.buttons[i].btnType+'">'+opts.buttons[i].type+'</button>';
        }

        var temp =   '<div class="mask-bg "></div>'+
            '<div class="mask">'+
            '<div class="dailog dailogStyle">'+
            '<div class="dailogHead">'+opts.title+'</div>'+
            '<div class="dailogContent">'+
            '<form action="###" class="form style1">'+
            '<div class="form-group">'+
            '<div class="w100">'+
            '<input type="checkbox" class="checkZw"> 批量设置主页转发任务 '+
            '<input type="text" class="inputText" disabled="disabled" placeholder="请输入转发次数" id="zfNum" min="0" max="100" step="1">'+
            '</div>'+
            '</div>'+
            '<div class="form-group">'+
            '<div class="w100">'+
            '<input type="checkbox" class="checkZw"> 批量设置职位转发任务 '+
            '<input type="number" class="inputText" disabled="disabled" placeholder="请输入转发次数" id="zwNum" min="0" max="100" step="1">'+
            '</div>'+
            '</div>'+
            '<div class="opreateBtn">'+
                btns+
            '</div>'+
            '</form>'+
            '</div>'+
            '</div>'+
            '</div>';

        var $dialogWrap = $(temp);
        var $dialog = $dialogWrap.find('.mask');
        var $mask = $dialogWrap.find('.mask-bg');
        var $commonList = $('.common-list');
        $commonList.append($dialogWrap);
        $mask.fadeIn('normal');
        $dialog.fadeIn('normal');

        /*选中要转发的内容*/
        var $checkZw = $(".checkZw");
        var $formGroup = $('.form-group');
        var $inputText = $('.inputText');
        $checkZw.on("click",function () {
           if($(this).prop("checked")){
               $(this).find("input").removeAttr("checked");
               $(this).closest($formGroup).find($inputText).removeAttr("disabled");
           } else {
               $(this).find("input").prop({checked:"checked"});
               $(this).closest($formGroup).find($inputText).prop({disabled:"disabled"});
           }
        });

        for(var i = 0; i < opts.buttons.length; i++){
            $dialogWrap.on('click', '.'+opts.buttons[i].classType, function () {
                var dataType = $(this).data("type");
                if(dataType){
                    opts.success(function () {
                        $mask.fadeOut('normal');
                        $dialog.fadeOut('normal');
                        $dialogWrap.remove();
                    });
                    return ;
                }
                if(!dataType){
                    $dialogWrap.remove();
                    return ;
                }
            });
        }
    };

    return {
        confirm : confirmDailog,
        alert   : alertDailog,
        addStaff:addStaffDailog,
        addCompany:addCompany,
        upFile:upFileDailog,
        forward:forwardDailog
    }
}();
