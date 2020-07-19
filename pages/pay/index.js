// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      msg:""
  },
  //买家留言
  orderMsg(e){
    this.setData({
      msg:e.detail.value
    })
    console.log(this.data.msg)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})