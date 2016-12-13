import router from '../router'
import mchAuthService from './mchAuthService'
import {API_ROOT} from '../config'
import {imgUrlFric} from '../config'
import {imgUrl} from '../config'


export default {
  imgUrlFric: imgUrlFric,
  imgUrl: imgUrl,

  //商家个人中心
  personCenter(context) {
    context.$progress.start();
    context.$http.post(API_ROOT + "mobile/mch/personCenter.do").then(function (response) {
      context.$progress.finish();
      var res = response.json();
      if (res.status == "ok") {
        context.lists = res.datas;
        console.log(JSON.stringify(context.lists));
        var len = Math.round(context.lists.evaTotalScore/context.lists.evaOrderNum);
        for(var j = 0;j<len;j++){
          context.item[j].starActive = true
        }
      } else {
        alert(res.message);
      }
    }, function (response) {
      context.$progress.failed()
      // 响应错误回调
    })
  },


  //商家退出
  mchLoginOut(context) {
    context.$progress.start()
    context.$http.post(API_ROOT + "mobile/mchLoginOut.do").then(function (response) {
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        mchAuthService.logout()
        context.$router.go("/")
      } else {
        alert(res.message);
      }
    }, function (response) {
      context.$progress.failed()
      // 响应错误回调
    })
  },

  //我的订单-个人
  myOrder(context,orderStatus) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/mch/getOrderList.do",orderStatus).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        context.list = res.datas
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },

  //积分提现
  presentIntegral(context) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/mch/scoreShow.do").then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        context.lists = res.datas
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },

  //点击提现
  txApply(context) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/mch/txApply.do").then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        context.$set('toasttext',"提现成功");
        context.$set('toastshow',true)
        setTimeout(function () {
          location.reload()
        },1000)
      } else {
        context.$set('toasttext',res.message);
        context.$set('toastshow',true)
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },

  //体现选择
  presentChioce(context,presentChioceArr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/mch/saveBankInfo.do",presentChioceArr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        context.$progress.finish()
        context.$route.router.go('/shops/presentIntegral')
        //presentIntegral
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },

  //提现记录
  presentList(context) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/mch/withList.do").then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status="ok"){
        context.$progress.finish()
        context.present = res.datas
        //context.fourNum = res.datas.cardNo.substr(res.datas.cardNo.length-4)
        if(context.present.length==0){
          context.dataHide = true
          context.listHide = false
        }else{
          context.dataHide = false
          context.listHide = true
        }
      }else{
        alert(res.message)
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },

  //返现明细----
  nowScoreModifly(context,arr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/mch/getTotalScoreReservedScore.do",arr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        if(res.datas!=null){
          context.nowPage = [];
          context.list = [];
          context.nowPage = res.datas.datas;
          context.totalNum = res.datas.totalPages;
          context.nextNum = res.datas.nextPage;
          context.pageNum = res.datas.pageNo;
          context.list = context.list.concat(context.nowPage);
          context.btnHide = true;
          console.log(JSON.stringify(res.datas));
          console.log(JSON.stringify(context.list))
        }

        if(context.list.length!=0){
          context.dataHide = false;
        }else{
          context.dataHide = true;
          context.btnHide = false;
        }


      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },



  //返现明细----
  nowScoreModiflyInfor(context,arr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/mch/getUseScoreDetails.do",arr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        if(res.datas!=null){
          context.nowPage = [];
          context.list = [];
          context.nowPage = res.datas.datas;
          context.totalNum = res.datas.totalPages;
          context.nextNum = res.datas.nextPage;
          context.pageNum = res.datas.pageNo;
          context.list = context.list.concat(context.nowPage);
          context.btnHide = true;
          console.log(JSON.stringify(res.datas));
          console.log(JSON.stringify(context.list))
        }

        if(context.list.length!=0){
          context.dataHide = false;
        }else{
          context.dataHide = true;
          context.btnHide = false;
        }


      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },



  //返现明细
  detailOutcome(context,arr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/mch/cashbacksub.do",arr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        if(res.datas!=null){

          context.nowPage = res.datas.datas;
          context.totalNum = res.datas.totalPages;
          context.nextNum = res.datas.nextPage;
          context.pageNum = res.datas.pageNo;
          context.list = context.list.concat(context.nowPage);
          context.btnHide = true;
          console.log(JSON.stringify(res.datas));
          console.log(JSON.stringify(context.list))
        }
        if(context.list.length!=0){
          context.dataHide = false;
        }else{
          context.dataHide = true;
          context.btnHide = false;
        }


      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },




  //返现明细
  detailIncome(context,dateArr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/mch/getIncomeDetails.do",dateArr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        if(res.datas!=null){
          context.list = res.datas.datas;
          context.btnHide = true;
          for(var i =0;i<num;i++){
            context.list[i].display = displayFalse;
          }

          for(var i = num;i<context.list.length;i++){
            context.list[i].display = displayTrue;
          }
        }
        context.btnHide = false;
        if(context.inList.length!=0){
          context.dataHide = false
        }else{
          context.dataHide = true
        }
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },

  //返现明细
  detailIncomes(context,dateArr) {
    context.$progress.start();
    context.$http.post(API_ROOT+"mobile/mch/getIncomeDetails.do",dateArr).then(function(response){
      context.$progress.finish();
      var res = response.json();
      if(res.status == "ok") {
        if(res.datas!=null){
          context.nowPage = res.datas.datas;
          context.totalNum = res.datas.totalPages;
          context.nextNum = res.datas.nextPage;
          context.pageNum = res.datas.pageNo;
          context.inList = context.inList.concat(context.nowPage);
          context.btnHide = true;
          console.log(JSON.stringify(res.datas))
          console.log(JSON.stringify(res.datas.datas))
        }

        if(context.inList.length!=0){
          context.dataHide = false;
        }else{
          context.dataHide = true;
          context.btnHide = false;
        }
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },




  //查询更多当前积分
  NowModiflyScore(context,pageArr) {
    context.$progress.start();
    context.$http.post(API_ROOT+"mobile/mch/getIncomeDetails.do",pageArr).then(function(response){
      context.$progress.finish();
      var res = response.json();
      if(res.status == "ok") {
        if(res.datas != null){
          context.nowPage = res.datas.datas;
          context.totalNum = res.datas.totalPages;
          context.nextNum = res.datas.nextPage;
          context.pageNum = res.datas.pageNo;
          context.inLinst = context.inLinst.concat(context.nowPage);
          context.btnHide = true;
          console.log(JSON.stringify(res.datas))
        }

        if(context.inLinst.length!=0){
          context.dataHide = false
        }else{
          context.dataHide = true
          context.btnHide = false;
        }
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },


  //商家分类
  getAllCategory(context) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/getAllCategory.do").then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        context.list = res.datas

      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },

  //商家分类
  getCategoryAllGoods(context,getCategoryArr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/getCategoryAllGoods.do",getCategoryArr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        context.list = res.datas.datas
        console.log(JSON.stringify(context.list))
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },

  //商家分类
  mchList(context,mchListArr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/getMchList.do",mchListArr).then(function(response){
      context.$progress.finish()
      var res = response.json()

      if(res.status == "ok") {
        if(res.datas!=null){
          context.nowPage = res.datas.datas;
          context.totalNum = res.datas.totalPages;
          context.nextNum = res.datas.nextPage;
          context.pageNum = res.datas.pageNo;
          context.list = context.list.concat(context.nowPage);
          context.btnHide = true;
        }
        if(context.list.length!=0){
          context.dataHide = false;
        }else{
          context.dataHide = true;
          context.btnHide = false;
        }
        for(var i =0;i<context.list.length;i++){
          context.list[i].item = [
            {starActive:false},
            {starActive:false},
            {starActive:false},
            {starActive:false},
            {starActive:false}
          ];
          var len = Math.round(context.list[i].evaTotalScore/context.list[i].evaOrderNum);

          for(var j = 0;j<len;j++){
            context.list[i].item[j].starActive = true
          }
          // if(context.list[i].lat||context.list[i].lng){
          //   context.lat = context.list[i].lat;
          //   context.lng = context.list[i].lng;
          //   return;
          // }
        }
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed();
      // 响应错误回调
    })
  },

  //商家详情
  shopsInfor(context,shopsInforArr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/getMchInfo.do",shopsInforArr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        context.list = res.datas
        var len = Math.round(context.list.evaTotalScore/context.list.evaOrderNum)

        for(var j = 0;j<len;j++){
          context.item[j].starActive = true
        }
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },

  //商家分类
  getMchGoodsList(context,getMchGoodsListArr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/getMchGoodsList.do",getMchGoodsListArr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        context.shopListArr = res.datas.datas
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },

  //积分补足
  createScoreSupmOrder(context,accountArr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/mch/createScoreSupmOrder.do",accountArr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        context.data = res.datas
        context.show = true
        localStorage.setItem('data',context.data.orderId)
        localStorage.setItem('dataMoney',context.data.amount)
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },

  //商铺信息
  linkShops(context,accountArr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/getMchInfo.do",accountArr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        if( res.datas!=null){
          context.list = res.datas
          var len = Math.round(context.list.evaTotalScore/context.list.evaOrderNum)
          for(var j = 0;j<len;j++){
            context.item[j].starActive = true
          }
        }
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },



  //评论-商家
  evaList(context) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/mch/evaList.do").then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        if(res.datas!=null){
          context.list = res.datas.datas
        }
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()

    })
  },

  //银行选择
  bankChioce(context,accountArr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/getBankList.do",accountArr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        this.optionList = res.datas
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },



  //忘记密码验证码-商家
  sendmchForgotAuthCode(context,sendMemForgotArr,btn) {

    context.$http.post(API_ROOT+"mobile/sendMchForgotAuthCode.do",sendMemForgotArr).then(function(response){

      var res = response.json()
      if(res.status == "ok") {
        context.xxId = res.datas
        var count = 60;
        var resend = setInterval(function(){
          count--;
          if (count > 0){
            context.code = count+"秒后重新获取"
            btn.value = context.code
            context.disabled = true
            context.type = true
          }else {
            clearInterval(resend);
            context.disabled = false
            context.type = false
            context.code = "获取验证码"
            btn.value = context.code
          }
        }, 1000);
        context.disabled = true

        context.$set('toasttext','验证码发送成功');
        context.$set('toastshow',true)
      } else {
        alert(res.message);
      }
    }, function(response){

    })
  },

  //忘记密码-商家
  updatePwd(context,updatePwdArr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/updateMchPwd.do",updatePwdArr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        context.$progress.finish()
        context.$route.router.go('/auth/login')

      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()

    })
  },

  //忘记密码验证码-商家
  sendMchForgotAuthCodes(context,sendMemForgotArr,btn) {
    context.$http.post(API_ROOT+"mobile/mch/sendMchModifyPwdAuthCode.do",sendMemForgotArr).then(function(response){
      var res = response.json()
      if(res.status == "ok") {
        context.xxId = res.datas
        var count = 60;
        var resend = setInterval(function(){
          count--;
          if (count > 0){
            context.code = count+"秒后重新获取"
            btn.value = context.code
            context.disabled = true
            context.type = true
          }else {
            clearInterval(resend);
            context.disabled = false
            context.type = false
            context.code = "获取验证码"
            btn.value = context.code
          }
        }, 1000);
        context.disabled = true

        context.$set('toasttext','验证码发送成功');
        context.$set('toastshow',true)
      } else {
        alert(res.message);
      }
    }, function(response){

    })
  },

  //忘记密码-商家
  updatemchPwd(context,updatePwdArr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/mch/modifyPwd.do",updatePwdArr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        context.$progress.finish()
        context.$route.router.go('/auth/login')

      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()

    })
  },

  //商品排序
  bigSortFun(context,updatePwdArr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/getCategoryAllGoods.do",updatePwdArr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        context.list = res.datas.datas
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()

    })
  },

  //当前积分
  nowScore(context,pageArr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/mch/getTotalScoreReservedScore.do",pageArr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        if(res.datas != null){
          context.nowPage = res.datas.datas;
          context.totalNum = res.datas.totalPages;
          context.nextNum = res.datas.nextPage;
          context.pageNum = res.datas.pageNo;
          context.list = context.list.concat(context.nowPage);
          context.btnHide = true;
          console.log(JSON.stringify(res.datas))
        }

        if(context.list.length!=0){
          context.dataHide = false;
        }else{
          context.dataHide = true;
          context.btnHide = false;
        }
        //console.log(JSON.stringify(res.datas.datas))
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },


  //当前积分
  nowScoreDetailsInfor(context,pageArr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/mch/getUseScoreDetails.do",pageArr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        if(res.datas != null){
          context.nowPage = res.datas.datas;
          context.totalNum = res.datas.totalPages;
          context.nextNum = res.datas.nextPage;
          context.pageNum = res.datas.pageNo;
          context.list = context.list.concat(context.nowPage);
          context.btnHide = true;
          console.log(JSON.stringify(res.datas))
        }

        if(context.list.length!=0){
          context.dataHide = false;
        }else{
          context.dataHide = true;
          context.btnHide = false;
        }
        //console.log(JSON.stringify(res.datas.datas))
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },



  //查询更多当前积分
  ModiflyNowScore(context,pageArr) {
    context.$progress.start();
    context.$http.post(API_ROOT+"mobile/mch/getTotalScoreReservedScore.do",pageArr).then(function(response){
      context.$progress.finish();
      var res = response.json();
      if(res.status == "ok") {
        if(res.datas != null){
          context.nowPage = res.datas.datas;
          context.totalNum = res.datas.totalPages;
          context.nextNum = res.datas.nextPage;
          context.pageNum = res.datas.pageNo;
          context.list = context.list.concat(context.nowPage);
          context.btnHide = true;
          console.log(JSON.stringify(res.datas))
        }

        if(context.list.length!=0){
          context.dataHide = false
        }else{
          context.dataHide = true
          context.btnHide = false;
        }
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },



  //查询更多当前积分
  ModiflyNowScoreInfor(context,pageArr) {
    context.$progress.start();
    context.$http.post(API_ROOT+"mobile/mch/getUseScoreDetails.do",pageArr).then(function(response){
      context.$progress.finish();
      var res = response.json();
      if(res.status == "ok") {
        if(res.datas != null){
          context.nowPage = res.datas.datas;
          context.totalNum = res.datas.totalPages;
          context.nextNum = res.datas.nextPage;
          context.pageNum = res.datas.pageNo;
          context.list = context.list.concat(context.nowPage);
          context.btnHide = true;
          console.log(JSON.stringify(res.datas))
        }

        if(context.list.length!=0){
          context.dataHide = false
        }else{
          context.dataHide = true
          context.btnHide = false;
        }
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },




  //预留积分
  reserveScore(context,arr) {
    context.$progress.start();
    context.$http.post(API_ROOT+"mobile/mch/getReservedScoreDetails.do",arr).then(function(response){
      context.$progress.finish();
      var res = response.json();
      if(res.status == "ok") {
        if(res.datas != null){
          context.nowPage = res.datas.datas;
          context.totalNum = res.datas.totalPages;
          context.nextNum = res.datas.nextPage;
          context.pageNum = res.datas.pageNo;
          context.list = context.list.concat(context.nowPage);
          context.btnHide = true;
          console.log(JSON.stringify(res.datas))
        }
        if(context.list.length!=0){
          context.dataHide = false;
        }else{
          context.dataHide = true;
          context.btnHide = false;
        }
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },


  //返现明细----
  preserveScoreModifly(context,arr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/mch/getReservedScoreDetails.do",arr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        if(res.datas!=null){
          context.nowPage = [];
          context.list = [];
          context.nowPage = res.datas.datas;
          context.totalNum = res.datas.totalPages;
          context.nextNum = res.datas.nextPage;
          context.pageNum = res.datas.pageNo;
          context.list = context.list.concat(context.nowPage);
          context.btnHide = true;
          console.log(JSON.stringify(res.datas));
          console.log(JSON.stringify(context.list))
        }

        if(context.list.length!=0){
          context.dataHide = false;
        }else{
          context.dataHide = true;
          context.btnHide = false;
        }


      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },


  //查询更多当前积分
  ModiflyrNowScore(context,pageArr) {
    context.$progress.start();
    context.$http.post(API_ROOT+"mobile/mch/getReservedScoreDetails.do",pageArr).then(function(response){
      context.$progress.finish();
      var res = response.json();
      if(res.status == "ok") {
        if(res.datas != null){
          context.nowPage = res.datas.datas;
          context.totalNum = res.datas.totalPages;
          context.nextNum = res.datas.nextPage;
          context.pageNum = res.datas.pageNo;
          context.list = context.list.concat(context.nowPage);
          context.btnHide = true;
          console.log(JSON.stringify(res.datas))
        }

        if(context.list.length!=0){
          context.dataHide = false
        }else{
          context.dataHide = true
          context.btnHide = false;
        }
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },

  //返现明细----
  modifyDetailIncome(context,arr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/mch/getIncomeDetails.do",arr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        if(res.datas!=null){
          context.nowPage = [];
          context.inList = [];
          context.nowPage = res.datas.datas;
          context.totalNum = res.datas.totalPages;
          context.nextNum = res.datas.nextPage;
          context.pageNum = res.datas.pageNo;
          context.inList = context.inList.concat(context.nowPage);
          context.btnHide = true;
          console.log(JSON.stringify(res.datas));
          console.log(JSON.stringify(context.inList))
        }

        if(context.inList.length!=0){
          context.dataHide = false;
        }else{
          context.dataHide = true;
          context.btnHide = false;
        }


      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },


  //返现明细----
  modifyDetailOutcome(context,arr) {
    context.$progress.start()
    context.$http.post(API_ROOT+"mobile/mch/cashbacksub.do",arr).then(function(response){
      context.$progress.finish()
      var res = response.json()
      if(res.status == "ok") {
        if(res.datas!=null){
          context.nowPage = [];
          context.list = [];
          context.nowPage = res.datas.datas;
          context.totalNum = res.datas.totalPages;
          context.nextNum = res.datas.nextPage;
          context.pageNum = res.datas.pageNo;
          context.list = context.list.concat(context.nowPage);
          context.btnHide = true;
          console.log(JSON.stringify(res.datas));
          console.log(JSON.stringify(context.list))
        }

        if(context.list.length!=0){
          context.dataHide = false;
        }else{
          context.dataHide = true;
          context.btnHide = false;
        }


      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  },


  //查询更多当前积分
  NowModiflyOutScore(context,pageArr) {
    context.$progress.start();
    context.$http.post(API_ROOT+"mobile/mch/cashbacksub.do",pageArr).then(function(response){
      context.$progress.finish();
      var res = response.json();
      if(res.status == "ok") {
        if(res.datas != null){
          context.nowPage = res.datas.datas;
          context.totalNum = res.datas.totalPages;
          context.nextNum = res.datas.nextPage;
          context.pageNum = res.datas.pageNo;
          context.list = context.list.concat(context.nowPage);
          context.btnHide = true;
        }

        if(context.list.length!=0){
          context.dataHide = false
        }else{
          context.dataHide = true
          context.btnHide = false;
        }
      } else {
        alert(res.message);
      }
    }, function(response){
      context.$progress.failed()
      // 响应错误回调
    })
  }


}
