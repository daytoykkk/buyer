// pages/user/index.js
Page({
  data: {
    name: "",
    city: "",
    imgUrl: ""
  },
  getMsg() {
    let msg = JSON.parse(wx.getStorageSync('userInfo').rawData);
    this.setData({
      name: msg.nickName,
      city: msg.city,
      imgUrl: msg.avatarUrl
    })
  },
  getOrders() {
    let that = this;
    let id = wx.getStorageSync("openid")
    wx.request({
      url: 'https://111.230.173.74:7008/thread/getOrderById/',
      method: 'get',
      data: {
        Id:JSON.stringify(id)
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.这个用户的所有订单)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  onShow: function () {
    this.getMsg()
      this.getOrders()
  }
})