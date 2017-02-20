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


        // 2. 分享接口
        // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
        $('.shareFriend').on("click",function () {
            wx.onMenuShareAppMessage({
                title: '',
                desc: '',
                link: '',
                imgUrl: '',
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    alert('用户点击发送给朋友');
                },
                success: function (res) {
                    alert('已分享');
                },
                cancel: function (res) {
                    alert('已取消');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
            alert('已注册获取“发送给朋友”状态事件');
        });


        // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        $('.shareFQ').on("touchend",function () {
            wx.onMenuShareTimeline({
                title: '',
                link: '',
                imgUrl: '',
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    alert('用户点击分享到朋友圈');
                },
                success: function (res) {
                    alert('已分享');
                },
                cancel: function (res) {
                    alert('已取消');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
            alert('已注册获取“分享到朋友圈”状态事件');
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
