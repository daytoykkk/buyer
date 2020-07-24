// pages/order/index.js
Page({
  data: {
    list: [],
    msg: [],
    imgUrl: "https://fzulyt.fun:7001/consumer/showEInvoice/?FileName=",
    orderState: false,
    aq:"",
    totalPrice:0,
    totalNumber:0
  },
  getMsg() {
    let that = this
    let orderId = wx.getStorageSync("orderId")
    let id = wx.getStorageSync("openid")
    wx.request({
      url: 'https://fzulyt.fun:7008/thread/getOrderProduct/',
      method: 'get',
      data: {
        OrderId: orderId,
        Id: id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let old_list = JSON.parse(res.data.这个订单的货物)
        let list = [];
        let hhh=""
        let len = old_list.length;
        for (let i = 0; i < len; i++) {
          let obj = JSON.parse(old_list[i].product)
          list.push({
            productNumber: old_list[i].number,
            obj
          })
        }
        list.forEach(i => {
          hhh+=i.obj.productId+"-"+i.productNumber+"-"+i.obj.productPrice+"-"
        });
        hhh=hhh.substr(0,hhh.length-1)
        that.setData({
          list,
          aq:hhh
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
    wx.request({
      url: 'https://fzulyt.fun:7008/thread/getOrder/',
      method: 'get',
      data: {
        OrderId: orderId,
        Id: id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          msg: res.data.这个订单的信息,
          orderState: res.data.这个订单的信息.orderState == "no" ? false : true,
          totalPrice:res.data.totalPrice,
          totalNumber:res.data.totalNumber
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  //确认收货
  confirmOrder() {
    let that=this;
    let orderId=wx.getStorageSync("orderId")
    wx.request({  
      url: 'https://fzulyt.fun:7008/thread/achieveOrder/',
      method: 'get',    
      data:{
        OrderId:orderId
      },
      header: {  
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data=="OK"){
          wx.showToast({
            title: '已确认收货',
            icon: 'success',
            duration: 1500,
            success: (result)=>{
              that.onShow()
            }
          });
        }
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  //取消订单
  cancelOrder() {
    let that=this
    let orderId=wx.getStorageSync("orderId")
    wx.request({  
      url: 'https://fzulyt.fun:7008/thread/concelOrder/',
      method: 'get',    
      data:{
        OrderId:orderId,
        aq:that.data.aq
      },
      header: {  
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data="OK"){
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 1500,
            success: (result)=>{
              wx.switchTab({
                url:'/pages/user/index'
              })
            }
          });
        }
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.getMsg()
  },
  onUnload:function(){
    wx.reLaunch({
      url:'/pages/user/index'
    })
  }
})