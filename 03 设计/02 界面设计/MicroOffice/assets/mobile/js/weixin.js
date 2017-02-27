$(function () {
    wx.config({
        debug: false,
        appId: '',
        timestamp: 1478266049,
        nonceStr: 'NdOpeKuccoaMsQqL',
        signature: '65cd218663a03295f33e175c4e99103ca95280da',
        jsApiList: [
            'chooseImage',
            'previewImage',
            'uploadImage'
        ]
    });


    //ready接口处理成功验证
    wx.ready(function () {

        // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
        wx.checkJsApi({
            jsApiList: [
                'getNetworkType',
                'previewImage'
            ],
            success: function (res) {
                alert(JSON.stringify(res));
            }
        });



        // 5 图片接口
        // 5.1 拍照、本地选图
        var images = {
            localId: [],
            serverId: []
        };
        $('#chooseImage').on("touchend",function () {
            wx.chooseImage({
                success: function (res) {
                    images.localId = res.localIds;
                    alert('已选择 ' + res.localIds.length + ' 张图片');
                },
                fail: function (res) {
                    console.log(JSON.stringify(res));
                }
            });
        });



//            // 5.2 图片预览
//            $('#previewImage').onclick = function () {
//                wx.previewImage({
//                    current: 'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
//                    urls: [
//                        'http://img3.douban.com/view/photo/photo/public/p2152117150.jpg',
//                        'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
//                        'http://img3.douban.com/view/photo/photo/public/p2152134700.jpg'
//                    ]
//                });
//            };
//
//            // 5.3 上传图片
//            $('#uploadImage').onclick = function () {
//                if (images.localId.length == 0) {
//                    alert('请先使用 chooseImage 接口选择图片');
//                    return;
//                }
//                var i = 0, length = images.localId.length;
//                images.serverId = [];
//                function upload() {
//                    wx.uploadImage({
//                        localId: images.localId[i],
//                        success: function (res) {
//                            i++;
//                            //alert('已上传：' + i + '/' + length);
//                            images.serverId.push(res.serverId);
//                            if (i < length) {
//                                upload();
//                            }
//                        },
//                        fail: function (res) {
//                            alert(JSON.stringify(res));
//                        }
//                    });
//                }
//                upload();
//            };
    });

    //error接口处理失败验证
    wx.error(function (res) {
        alert(res.errMsg);
    });
});
