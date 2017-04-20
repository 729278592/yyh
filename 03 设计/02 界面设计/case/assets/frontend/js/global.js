/**
 * Created by WHB on 2017/4/5.
 */
$(function () {
    /*全屏图片居中*/
    var ai = $(".autoImg");
    ai.each(function(){
        $(this).get(0).style.width ="1920px";
        var that = $(this);
        function toResize(){
            var veiwidth = $(window).width();
            if(veiwidth>1205){
                that.get(0).style.left = -(parseInt(that.get(0).style.width) - veiwidth)/2 + "px"
            }
        }
        toResize();
        $(window).on("resize",function(){
            toResize()
        });
    });
});

