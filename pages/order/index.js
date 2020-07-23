// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
    getMsg(){
        let orderId=wx.getStorageSync("orderId")
        console.log(orderId)
    },
  onLoad: function (options) {

  },
  onShow: function () {
      this.getMsg()
  }
})