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
  newTime(){
    let date=new Date()
    let y = date.getFullYear();  
    let m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    let d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    let h = date.getHours();  
    h=h < 10 ? ('0' + h) : h;  
    let minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    let second=date.getSeconds();  
    second=second < 10 ? ('0' + second) : second;  
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
  },
  initWebSocket: function () {
    let _this = this; 
    let id = wx.getStorageSync("openid")
    let ws = wx.connectSocket({
      url: 'wss://fzulyt.fun:7007/websocket/1/' + id,
      header: {
        'content-type': 'application/json',
      },
      timeout: 5000,//超时时间，单位为毫秒
      success: (e) => {//接口调用成功的回调函数
        console.log(e)
      },
      fail: (e) => {//接口调用失败的回调函数
        console.log(e)
      },
      complete: (e) => {//接口调用结束的回调函数（调用成功、失败都会执行）
        console.log(e)
      }
    })
    _this.setData({
      ws
    })
    ws.onError((e) => {
      console.log(e)
    })

    ws.onMessage = function (e) {
      console.log("on:" + "e")
    };
  },
  //确认收货
  confirmOrder() {
    let that=this;
    let orderId=wx.getStorageSync("orderId")
    let time=that.newTime()
    wx.request({  
      url: 'https://fzulyt.fun:7008/thread/achieveOrder/',
      method: 'get',    
      data:{
        OrderId:orderId,
        time:time
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
             let _data=that.data.msg;
                let id=_data.id;
                id=id.substr(1)
                id=id.substr(0,id.length-1)
              _data.orderState="yes"
              _data.see="no"
             _data.id=id
              that.data.ws.send({
                data: JSON.stringify(_data),
                success: (e) => {
                  console.log(e)
                },
                fail: (e) => {
                  console.log(e)
                }
              })

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
    let time=that.newTime()
    wx.request({  
      url: 'https://fzulyt.fun:7008/thread/concelOrder/',
      method: 'get',    
      data:{
        OrderId:orderId,
        aq:that.data.aq,
        time:time
      },
      header: {  
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data="OK"){
          let _data=that.data.msg;
          let id=_data.id;
          id=id.substr(1)
          id=id.substr(0,id.length-1)
        _data.orderState="concel"
        _data.see="no"
       _data.id=id
        _data.time=time
          that.data.ws.send({
            data: JSON.stringify(_data),
            success: (e) => {
              console.log(e)
            },
            fail: (e) => {
              console.log(e)
            }
          })

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
    this.initWebSocket()
  },
  onUnload:function(){
    wx.reLaunch({
      url:'/pages/user/index'
    })
  }
})