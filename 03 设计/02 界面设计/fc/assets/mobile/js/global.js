/**
 * Created by WHB on 2016/8/12.
 */
$(function(){

    /*搜索条件*/
    var inputGroup = $(".searchInput");
    var searchInput = $(".search_input");
    var search_clear = $(".close");
    searchInput.on('keyup', function () {
        if($.trim($(this).val())){
            $(this).closest(inputGroup).find(search_clear).removeClass("hide")
        }else{
            $(this).closest(inputGroup).find(search_clear).addClass("hide")
        }
    });
    search_clear.on('touchend', function () {
        $(this).closest(inputGroup).find(searchInput).val('');
        $(this).addClass("hide")
    });

    /*筛选选择条件*/
    var weui_dialog_ext = $(".weui_dialog_ext");
    var conditionMenua = $(".conditionMenu a");
    var conditionListLi = $(".conditionList li");

    conditionMenua.on("click", function(e){
        e.preventDefault();
        $(this).closest("li").addClass("active");
        $(this).parent().siblings().removeClass("active");
        let tabId = $(this).attr("href");
        $(tabId).addClass("active");
        $(tabId).siblings().removeClass("active");
    });

    conditionListLi.on("click",function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    });
});




/*筛选选择结构动画*/
var $wrapper = $("body");
function leftAnite(obj,slideObj,slideType,hide) {
    obj.on("click",function(){
        slideObj.removeClass(hide);
        slideObj.addClass(slideType);
        slideObj.on('webkitAnimationEnd', function (){
            slideObj.removeClass(slideType);
            slideObj.removeClass(hide);
            $wrapper.addClass("overflowy");
        }).on('animationend', function (){
            slideObj.removeClass(slideType);
            slideObj.removeClass(hide);
            $wrapper.addClass("overflowy");
        });
    });
}


function rightAnite(obj,slideObj,slideType,hide) {
    obj.on("click",function(e){
        e.preventDefault();
        slideObj.addClass(slideType);
        slideObj.on('webkitAnimationEnd', function (){
            slideObj.removeClass(slideType);
            slideObj.addClass(hide);
            $wrapper.removeClass(slideType);
        }).on('animationend', function (){
            slideObj.removeClass(slideType);
            slideObj.addClass(hide);
            $wrapper.removeClass("overflowy");
        });
    });
    $(".playFlex").on("click",function (e) {
        e.stopPropagation();
    });
}
