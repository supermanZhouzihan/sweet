//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  item:["热映","待映"],
  currentTab: 0 ,
  list:[],
  hotList:[],
  id:"",
  toView: 'red',
  scrollTop: 100,
  ip:"http://172.20.10.4:5000"
  //   motto: 'Hello World',
  //   userInfo: {},
  //   hasUserInfo: false,
  //   canIUse: wx.canIUse('button.open-type.getUserInfo')
  }, 
  dyxq:function(e){
    wx.navigateTo({
      url: `../dyxq/dyxq?id=` + e.currentTarget.dataset.id,
    })
  },
   navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    if (e.currentTarget.dataset.idx==0){
      wx.request({
        url: 'http://172.20.10.4:5000/dyxq', //仅为示例，并非真实的接口地址
        method: "POST",
        success: ((res) => {
          
          this.list = res.data;
          let a = this.list
          a.map((item) => {
            item.movie_cover_img[0] = item.movie_cover_img[0].replace(/\\/g, "/")
            // 年
            let showyear = (new Date(item.movie_date)).getFullYear();
            //月
            let showmonth = (new Date(item.movie_date)).getMonth();
            //日
            let showdate = (new Date(item.movie_date)).getDate();
            //毫秒
            let showtime = new Date(item.movie_date).getTime();


            //当前日期
            //日
            let nowDate = new Date().getDate();
            //年
            let nowYear = new Date().getFullYear();
            //月
            let nowmonth = new Date().getMonth();
            //毫秒数
            let time = new Date().getTime();

            //相差的天数
            let cdate = showdate - nowDate;

            if (showtime - time > 0) {
              if (showyear - nowYear === 0 && showmonth - nowmonth === 0 && cdate <= 7) {
                item.active = "预售"
                switch (cdate) {
                  case 1: item.movieday = "明天上映"; break;
                  case 2: item.movieday = "后天上映"; break;
                  default: item.movieday = cdate + "天后上映";
                }
              }
              else {
                item.active = "预售"
                item.movieday = item.movie_date + "上映"
              }
            }
            else {
              item.active = "购买";
              item.movieday = item.movie_date + "上映"
            }
          })
          this.setData({
            list: a
          })
        })
      })
    }
    else{
      wx.request({
        url: 'http://172.20.10.4:5000/jijiangshangying', //仅为示例，并非真实的接口地址
        method: "POST",
        data:{
          "upcoming_release": "false"
        },
        success: ((res) => {
          this.list = res.data;
          let a = this.list
          //挑选movie_see不为空的值
          let b=  a.filter((item)=>{
            if (item.movie_see != "")
              return item.movie_see
          })
             //排序
          function compare(property) {
            return function (a, b) {
              var value1 = a[property];
              var value2 = b[property];
              return value2 - value1;
            }
          }
        let c= b.sort(compare('movie_see'))
        c.map((item)=>{
          item.movie_cover_img[0] = item.movie_cover_img[0].replace(/\\/g, "/")
        })
          a.map((item) => {
            item.movie_cover_img[0] = item.movie_cover_img[0].replace(/\\/g, "/")
            // 年
            let showyear = (new Date(item.movie_date)).getFullYear();
            //月
            let showmonth = (new Date(item.movie_date)).getMonth();
            //日
            let showdate = (new Date(item.movie_date)).getDate();
            //毫秒
            let showtime = new Date(item.movie_date).getTime();

            //当前日期
            //日
            let nowDate = new Date().getDate();
            //年
            let nowYear = new Date().getFullYear();
            //月
            let nowmonth = new Date().getMonth();
            //毫秒数
            let time = new Date().getTime();
            //相差的天数
            let cdate = showdate - nowDate;
            if (showtime - time > 0) {
              if (showyear - nowYear === 0 && showmonth - nowmonth === 0 && cdate <= 7) {
                item.active = "预售"
                switch (cdate) {
                  case 1: item.movieday = "明天上映"; break;
                  case 2: item.movieday = "后天上映"; break;
                  default: item.movieday = cdate + "天后上映";
                }
              }
              else {
                item.active = "预售"
                item.movieday = item.movie_date + "上映"
              }
            }
          })
          console.log(c);
          this.setData({
            list: a,
           hotList:c
          })
        })
      })
    }
  } 
,
 

  // //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../movie/maoyan'
    })
  },
  onLoad: function () {
    wx.request({
      url: 'http://172.20.10.4:5000/dyxq', //仅为示例，并非真实的接口地址
      method: "POST",
      success: ((res) => {
        this.list = res.data;
        let a = this.list

       
        
        a.map((item) => {
          item.movie_cover_img[0] = item.movie_cover_img[0].replace(/\\/g, "/")

          // 年
          let showyear = (new Date(item.movie_date)).getFullYear();
          //月
          let showmonth = (new Date(item.movie_date)).getMonth();
          //日
          let showdate = (new Date(item.movie_date)).getDate();
          //毫秒
          let showtime = new Date(item.movie_date).getTime();


          //当前日期
          //日
          let nowDate = new Date().getDate();
          //年
          let nowYear=new Date().getFullYear();
          //月
          let nowmonth=new Date().getMonth();
          //毫秒数
          let time = new Date().getTime();

          //相差的天数
          let cdate = showdate - nowDate;

          if (showtime - time>0){
            if (showyear - nowYear === 0 && showmonth - nowmonth === 0 && cdate <= 7) {
              item.active = "预售"
              switch (cdate) {
                case 1: item.movieday = "明天上映"; break;
                case 2: item.movieday = "后天上映"; break;
                default: item.movieday = cdate + "天后上映";
              }
            }
            else {
              item.active = "预售"
              item.movieday = item.movie_date + "上映"
            }
          }
          else{
            item.active = "购买";
            item.movieday = item.movie_date + "上映"
          }
          
         
          
        })
        this.setData({
          list: a
        })
      })
    })
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
      }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
