$(function(){

    /*验证表单*/
    $("#form_sample_1").validate({

        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        rules: {
            compangName:{
                required:true
            },
            companyInfor:{
                required:true
            },
            companyAddress:{
                required:true
            },
            url: {
                required: true,
                url: true
            },
            compangDetails: {
                required: true
            },



            time:{
                required:true
            },
            konwInfor:{
                required:true
            },
            financing:{
                required:true
            },


            peopleName:{
                required:true
            },
            caseInfor:{
                required:true
            },
            teamJob:{
                required:true
            },
            peopleInfor:{
                required:true
            },
            productName:{
                required:true
            },
            productInfor:{
                required:true
            },
            productUrl:{
                required:true,
                url:true
            }
        },

        messages: {
            compangName:{
                required:"请输入公司姓名"
            },
            companyInfor:{
                required:"请输入公司简称"
            },
            companyAddress:{
                required:"请输入公司地址"
            },
            url: {
                required: "请输入公司网址",
                url: "请输入正确网址格式"
            },
            compangDetails: {
                required: "请输入公司简介"
            },
            time:{
                required:"请输入公司成立时间"
            },
            konwInfor:{
                required:"请输入产权储备信息"
            },
            financing:{
                required:"请输入投融资情况"
            },
            caseInfor:{
                required:"请输入项目介绍"
            },
            teamJob:{
                required:"请输入在团队中担任角色"
            },
            peopleInfor:{
                required:"请输入个人简介"
            },
            peopleName:{
                required:"请输入创始人姓名"
            },
            productName:{
                required:"请输入产品名称"
            },
            productInfor:{
                required:"请输入产品简介"
            },
            productUrl:{
                required:"请输入产品链接",
                url:"请输入正确网址格式"
            }
        },

        errorPlacement: function (error, element) { // render error placement for each input type
            if (element.parent(".input-group").size() > 0) {
                error.insertAfter(element.parent(".input-group"));
            } else {
                error.insertAfter(element); // for other inputs, just perform default behavior
                error.insertAfter(element.closest(".col-md-6"));
            }

        },

        highlight: function (element) { // hightlight error inputs
            $(element).closest('.form-group').removeClass("has-success").addClass('has-error'); // set error class to the control group
        },

        unhighlight: function (element) { // revert the change done by hightlight
            $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
        },

        success: function (label, element) {
            label.closest('.form-group').removeClass('has-error'); // set success class to the control group
        },

        submitHandler: function(form) {
            //                    register();
        }
    });
});