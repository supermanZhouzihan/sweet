// pages/dyxq/dyxq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  id:"",
  ip:"http://172.20.10.4:5000",
  height:"150rpx",
  img_jiantouUrl: "../../img/箭头.png",
  actorList:[],
  actorName:[],
  movie:{},
  movie_imgList:[]
  },

  changeHight: function () {
    if(this.data.height=="150rpx")
      this.setData({
        height: "auto",
        img_jiantouUrl:"../../img/箭头1.png"
      })
    else
      this.setData({
        height: "150rpx",
        img_jiantouUrl:"../../img/箭头.png"
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      url: 'http://172.20.10.4:5000/dyxq', //仅为示例，并非真实的接口地址
      method: "POST",
      data:{
        "_id": options.id
      },
      success: ((res) => {
        console.log(res.data);
        let actorName = res.data.movie_actors.split("、");
        // console.log(actorName)
        res.data.movie_cover_img[0]=  res.data.movie_cover_img[0].replace(/\\/g, "/")
        res.data.movie_director_img[0] = res.data.movie_director_img[0].replace(/\\/g, "/")
        let m = res.data.movie_img.map((item)=>{
          return item = item.replace(/\\/g, "/");
        })
        console.log(m)
       let c =res.data.movie_actors_img.map((item)=>{
         return item = item.replace(/\\/g, "/");
        })
        this.setData({
          movie: res.data,
          actorList:c,
          actorName: actorName,
          movie_imgList: m
        })
      })
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})