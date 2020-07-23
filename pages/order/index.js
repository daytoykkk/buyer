// pages/order/index.js
Page({
  data: {
    list: [],
    msg: [],
    imgUrl: "https://111.230.173.74:7001/consumer/showEInvoice/?FileName=",
    orderState: false
  },
  getMsg() {
    let that = this
    let orderId = wx.getStorageSync("orderId")
    let id = wx.getStorageSync("openid")
    wx.request({
      url: 'https://111.230.173.74:7008/thread/getOrderProduct/',
      method: 'get',
      data: {
        OrderId: orderId,
        Id: id
      },
      header: {
        'content-type': 'application/json'
        // "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        let old_list = JSON.parse(res.data.这个订单的货物)
        let list = [];
        let len = old_list.length;
        for (let i = 0; i < len; i++) {
          let obj = JSON.parse(old_list[i].product)
          list.push({
            productNumber: old_list[i].number,
            obj
          })
        }
        that.setData({
          list
        })
        console.log(that.data.list)
      },
      fail: function (err) {
        console.log(err)
      }
    })
    wx.request({
      url: 'https://111.230.173.74:7008/thread/getOrder/',
      method: 'get',
      data: {
        OrderId: orderId,
        Id: id
      },
      header: {
        'content-type': 'application/json'
        // "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.setData({
          msg: res.data.这个订单的信息,
          orderState: res.data.这个订单的信息.orderState == "no" ? false : true
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  //确认收货
  confirmOrder() {
    let orderId=wx.getStorageSync("orderId")
    wx.request({  
      url: 'httpss://111.230.173.74:7008/thread/achieveOrder/',
      method: 'get',    
      data:{
        OrderId:orderId
      },
      header: {  
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  //取消订单
  cancelOrder() {
    console.log("取消订单")
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.getMsg()
  }
})